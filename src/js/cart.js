import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
  const htmlItems = itemsArray.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".cart-card__remove").forEach((btn) => {
    btn.addEventListener("click", removeItemFromCart);
  });
}

function cartItemTemplate(item) {
  return (
    "<li class='cart-card divider'>" +
    "<span class='cart-card__remove' data-id='" +
    item.Id +
    "'>✖</span>" +
    "<a href='#' class='cart-card__image'>" +
    "<img src='" +
    item.Images.PrimarySmall +
    "' alt='" +
    item.Name +
    "' />" +
    "</a>" +
    "<a href='#'>" +
    "<h2 class='card__name'>" +
    item.Name +
    "</h2>" +
    "</a>" +
    "<p class='cart-card__color'>" +
    item.Colors[0].ColorName +
    "</p>" +
    "<p class='cart-card__quantity'>qty: 1</p>" +
    "<p class='cart-card__price'>$" +
    item.FinalPrice +
    "</p>" +
    "</li>"
  );
}

function removeItemFromCart(event) {
  const productId = event.target.dataset.id;
  let cart = getLocalStorage("so-cart");
  cart = Array.isArray(cart) ? cart : [cart];

  const updatedCart = cart.filter((item) => item.Id !== productId);
  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
}

renderCartContents();
