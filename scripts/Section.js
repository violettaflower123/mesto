import Card from "./Card.js";
//import { createCard } from "./index.js";
//import handleCardClick from "./index.js";


export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

addItem(element) {
    this._container.prepend(element);
    }

renderItems() {
  this._initialArray.forEach(item => {
    this._renderer(item);
  });
}

}
