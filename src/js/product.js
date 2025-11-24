import { setLocalStorage, getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import {
  loadHeaderFooter,
  getParam,
  alertMessage,
  updateCartBadge,
} from './utils.mjs';
import ProductDetails from './productdetails.mjs';
loadHeaderFooter();
const productID = getParam('product');
const category = getParam('category');
const dataSource = new ExternalServices(category);

function addProductToCart(productcart) {
  let cart = getLocalStorage('so-cart') || [];
  cart = Array.isArray(cart) ? cart : [cart];
  cart.push(productcart);
  setLocalStorage('so-cart', cart);
  updateCartBadge();
  alertMessage('Product added to cart!', true, 'success');
}

// add to cart button event handler
async function addToCartHandler(e) {
  const productadd = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(productadd);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);

const product = new ProductDetails(productID, dataSource);
product.init();
