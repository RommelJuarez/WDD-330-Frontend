import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
loadHeaderFooter();

const category = getParam("category");

const dataSource = new ExternalServices();

const listElement = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, listElement);

if (category) {
  const heading = document.querySelector(".Top-Products");
  if (heading) {
    heading.textContent = `Top Products: ${category}`;
  }
}

myList.init();
