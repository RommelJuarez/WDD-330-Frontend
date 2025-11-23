import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.calculateOrderTotal();
    this.calculateItemCount();
  }

  calculateItemCount() {
    const cartItems = getLocalStorage(this.key);
    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
    const numItems = itemsArray.length;
    document.querySelector(`${this.outputSelector} .items-number`).textContent = numItems;
  }
  calculateItemSummary() {
    const cartItems = getLocalStorage(this.key);
    if (!cartItems || cartItems.length === 0) {
      this.itemTotal = 0;
      
      return;
    }
    
    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
    this.itemTotal = itemsArray.reduce((sum, item) => sum + item.FinalPrice, 0);
    console.log(this.itemTotal);
    document.querySelector(`${this.outputSelector} .subtotal`).textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    const cartItems = getLocalStorage(this.key);
    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
    const numItems = itemsArray.length;
    
    this.tax = this.itemTotal * 0.06;
    
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }
    calculateOrderTotalShipping() {
    const cartItems = getLocalStorage(this.key);
    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
    const numItems = itemsArray.length;
    
    this.tax = this.itemTotal * 0.06;
    this.shipping = numItems > 0 ? 10 + (numItems - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
    document.querySelector(`${this.outputSelector} .shipping`).textContent = `$${this.shipping.toFixed(2)}`;
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} .tax`).textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} .order-total`).textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems(items) {
    const itemsArray = Array.isArray(items) ? items : [items];
    return itemsArray.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const json = {};
    formData.forEach((value, key) => {
      json[key] = value;
    });

    const items = getLocalStorage(this.key);
    
    const order = {
      orderDate: new Date().toISOString(),
      fname: json.fname,
      lname: json.lname,
      street: json.street,
      city: json.city,
      state: json.state,
      zip: json.zip,
      cardNumber: json.cardNumber,
      expiration: json.expiration,
      code: json.code,
      items: this.packageItems(items),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };

    const dataSource = new ExternalServices();
    return await dataSource.checkout(order);
  }
}