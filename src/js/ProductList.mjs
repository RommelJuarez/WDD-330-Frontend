import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" />
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.products = list;
    this.renderList(list);
    this.addQuickViewListeners();
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  addQuickViewListeners() {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    quickViewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = e.target.dataset.id;
        this.showQuickView(productId);
      });
    });
  }

  async showQuickView(productId) {
    const product = await this.dataSource.findProductById(productId);
    this.renderModal(product);
  }

  renderModal(product) {
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    modal.innerHTML = `
      <div class="modal-content">
        <span class="modal-close">✖</span>
        <div class="modal-body">
          <div class="modal-image">
            <img src="${product.Images.PrimaryLarge}" alt="${product.Name}" />
          </div>
          <div class="modal-details">
            <h2>${product.Name}</h2>
            <p class="modal-brand">${product.Brand.Name}</p>
            <p class="modal-price">$${product.FinalPrice}</p>
            <p class="modal-color">${product.Colors[0].ColorName}</p>
            <div class="modal-description">
              ${product.DescriptionHtmlSimple}
            </div>
            <a href="/product_pages/index.html?product=${product.Id}" class="modal-view-full">View Full Details</a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    
    modal.querySelector('.modal-close').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        document.body.removeChild(modal);
      }
    });
  }
}