import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductDetails from "./productdetails.mjs";
loadHeaderFooter();
const productID = getParam("product");
const category = getParam("category");
const dataSource = new ProductData(category);

function addProductToCart(productcart) {
  setLocalStorage("so-cart", productcart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const productadd = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(productadd);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

const product = new ProductDetails(productID, dataSource);
product.init();
