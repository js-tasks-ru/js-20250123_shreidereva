import fetchJson from "./utils/fetch-json.js";
import ColumnChartV1 from "../../04-oop-basic-intro-to-dom/1-column-chart/index.js";

const BACKEND_URL = "https://course-js.javascript.ru";

export default class ColumnChart extends ColumnChartV1 {
  url;
  constructor({
    url = "",
    range = {},
    label = "",
    link = "",
    formatHeading = (value) => value,
  } = {}) {
    super({ label, link, formatHeading });
    this.url = url;
    const { from, to } = range;
    this.fetchData(from, to);
  }

  createUrl(from, to) {
    const url = new URL(this.url, BACKEND_URL);
    url.searchParams.append('from', from);
    url.searchParams.append('to', to);
    return url.toString();
  }
  fetchData(from, to) {
    fetch(this.createUrl(from, to))
      .then(response => response.json())
      .then(data => {
        this.data = Object.values(data);
        this.value = this.data.reduce((sum, current) => sum + current, 0);
        super.update(this.data);
      })
      .catch(error => console.error(error));
  }

  async update(from, to) {
    try {
      const url = this.createUrl(from, to);
      const response = await fetchJson(url);
      this.data = Object.values(response);
      this.value = this.data.reduce((sum, current) => sum + current, 0);
      super.update(this.data);
      return response;
    } catch (error) {
      console.error(error);
    } 
  }
}