export default class ColumnChart {
  element;
  chartHeight = 50;
  constructor ({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = value => value,
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;
    this.element = this.createElement(this.createTemlate());
  }

  createElement(template) {
    const element = document.createElement('div');
    element.classList.add('dashboard__charts_test');

    element.innerHTML = template;
    return element.firstElementChild;
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;
  
    return this.data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  createColumnChart() {
    return this.getColumnProps(this.data).map(({ percent, value }) => {
      return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;
    }).join('');
  }

  createClassColumnChart() {
    return this.data.length ? 'column-chart' : 'column-chart column-chart_loading';
  }

  createTemlate() {
    return `
        <div class="${this.createClassColumnChart()}" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
            ${this.label}
            <a href="${this.link}" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
            <div data-element="body" class="column-chart__chart">
                ${this.createColumnChart()}
            </div>
        </div>
        </div>
    `;
  }

  update(newData) {
    this.data = newData;
    this.element.querySelector('.column-chart__chart').innerHTML = this.createColumnChart();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
