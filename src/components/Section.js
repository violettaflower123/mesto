
export default class Section {
  constructor({ renderer }, containerSelector, api) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector)
    this._api = api;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

}
