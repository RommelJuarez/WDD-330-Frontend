import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotalShipping();
});

document.querySelector("#checkoutForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  try {
    const response = await checkout.checkout(e.target);
    alert("Order submitted successfully!");
    localStorage.removeItem("so-cart");
    console.log("Order submitted successfully:", response);
    window.location.href = "/index.html";
  } catch (error) {
    console.log( response);
    //alert("There was an error processing your order.");
    console.error("Error submitting order:", error);
  }
});