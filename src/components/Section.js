import Card from "./Card.js";

export default class Section {
  init({ items, renderer }, containerSelector, api) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector)
    this._api = api;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  saveItem(name, link) {
    this._api
    .addCard({name: name, link: link})
    .then((data) => this.addItem({name: data.name, link: data.link}))
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  renderOneItem(element) {
    this._renderer(element);
  }
}
