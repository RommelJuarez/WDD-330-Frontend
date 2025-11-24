import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import CheckoutProcess from "./CheckProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotalShipping();
});

document
  .querySelector("#checkoutForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await checkout.checkout(e.target);
      console.log("Order submitted successfully:", response);

      alertMessage("Order submitted successfully!", true, "success");

      localStorage.removeItem("so-cart");
      window.location.href = "./success.html";
    } catch (error) {
      if (error.name === "servicesError") {
        console.error("Checkout failed:", error.message);

        if (typeof error.message === "object") {
          Object.entries(error.message).forEach(([field, detail]) => {
            alertMessage(`Error in ${field}: ${detail}`, false, "error");
          });

          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          alertMessage(error.message, true, "error");
        }
      } else {
        console.error("Unexpected error:", error);
        alertMessage(
          "There was an error processing your order. Please try again.",
          true,
          "error",
        );
      }

      const submitButton = document.querySelector(".checkout-button");
      submitButton.disabled = false;
      submitButton.textContent = "Complete Purchase";
    }
  });
