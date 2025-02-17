export default class SortableTable {
  subElements = {};
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());
    this.selectSubElements();
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  createElement(template) {
    const element = document.createElement('div');
    element.classList.add('sortable-table');
  
    element.innerHTML = template;
    return element;
  }

  createTemplate() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.createHeaderCell()}
      </div>

      <div data-element="body" class="sortable-table__body">
        ${this.createTableCell()}
      </div>
    `;
  }

  createHeaderCell() {
    return this.headerConfig.map(column => `
      <div class="sortable-table__cell" data-id="${column.id}" data-sortable="${column.sortable}">
        <span>${column.title}</span>
        ${column.sortable ? '<span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>' : ''}
      </div>
    `).join('');
  }

  createTableCell() {
    return this.data.map(item => {
      return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this.headerConfig.map(column => {
            if (column.template) {
              return column.template(item[column.id]);
            }
            return `<div class="sortable-table__cell">${item[column.id] || ''}</div>`;
          }).join('')}
        </a>`;
    }).join('');
  }

  sort(field, order) {
    const column = this.headerConfig.find(column => column.id === field);
    if (!column || !column.sortable) { return; }
    const direction = order === 'asc' ? 1 : -1;

    const sortedData = [...this.data].sort((a, b) => {
      if (column.sortType === 'string') {
        return direction * a[field].localeCompare(b[field], ['ru', 'en'], { caseFirst: 'upper' });
      } else if (column.sortType === 'number') {
        return direction * (a[field] - b[field]);
      } else {
        return 0;
      }
    });
  
    this.update(sortedData);
    this.updateHeader(field, order);
  }

  updateHeader(field, order) {
    this.headerConfig.forEach(column => {
      const columnElement = this.element.querySelector(`.sortable-table__cell[data-id="${column.id}"]`);
      if (column.id === field) {
        columnElement.dataset.order = order;
      } else {
        columnElement.removeAttribute('data-order');
      }
    });
  } 

  update(newData) {
    this.data = newData;
    const bodyElement = this.subElements.body;
    if (bodyElement) {
      bodyElement.innerHTML = this.createTableCell();
    }
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

