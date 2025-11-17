import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      // Fetch product details
      this.product = await this.dataSource.findProductById(this.productId);

      
      this.renderProductDetails();

      
      const button = document.getElementById('addToCart');
      if (button) {
        button.addEventListener('click', this.addProductToCart.bind(this));
      }
    } catch (error) {
      console.error('Error al inicializar el producto:', error);
    }
  }

  addProductToCart() {
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    
    const nameEl = document.querySelector('h2.divider');
    if (nameEl) nameEl.textContent = this.product.Name;

    
    const descEl = document.querySelector('.product__description');
    if (descEl) descEl.innerHTML = this.product.DescriptionHtmlSimple;

    
    const priceEl = document.querySelector('.product-card__price');
    if (priceEl) priceEl.textContent = `$${this.product.FinalPrice}`;

    
    const colorEl = document.querySelector('.product__color');
    if (colorEl) {
      const color = this.product.Colors?.[0]?.ColorName || 'N/A';
      colorEl.textContent = color;
    }

   
    const imageEl = document.querySelector('img.divider');
    if (imageEl) {
      imageEl.src = this.product.Images.PrimaryLarge;
      imageEl.alt = this.product.Name;
    }

    
    const button = document.getElementById('addToCart');
    if (button) {
      button.setAttribute('data-id', this.product.Id);
    }
  }
}