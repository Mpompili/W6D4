class DomNodeCollection {
  constructor(HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  each(callback) {
    this.HTMLElements.forEach(callback);
  }

  html(string) {
    if (typeof string === 'undefined'){
      return this.HTMLElements[0].innerHTML;
    } else {
      for (let i = 0; i < this.HTMLElements.length; i++) {
        this.HTMLElements[i].innerHTML = string;
      }
    }
  }

  empty() {
    for (let i = 0; i < this.HTMLElements.length; i++) {
      this.HTMLElements[i].innerHTML = "";
    }
  }

  append(...args) {
    for (let i = 0; i < this.HTMLElements.length; i++) {
      for (let j = 0; j < args.length; j++) {
        this.HTMLElements[i].innerHTML += args[j];
      }
    }
  }

  attr(key, val) {
    if (typeof val !== "undefined") {
      console.log(typeof val);
      this.each(element => element.setAttribute(key, val));
    } else {
      return this.HTMLElements[0].getAttribute(key);
    }
  }

  addClass(...className) {
    this.each(element => element.classList.add(...className));
  }

  removeClass(...className) {
    this.each(element => element.classList.remove(...className));
  }

  children() {
    let children = [];
    this.each(element => {
      for (let i = 0; i < element.children.length; i++) {
        children.push(element.children[i]);
      }
    });
    return new DomNodeCollection(children);
  }

  parent() {
    let parents = [];
    this.each(element => parents.push(element.parentNode));
    return new DomNodeCollection(parents);
  }

  find(selector) {
    let results = [];
    this.each(element => {
      results.push(Array.from(element.querySelectorAll(selector)));
    });
    return results;
  }

  remove() {
    this.each(element => {
      element.parentNode.removeChild(element);
    });
  }

  on(type, listener) {
    this.each(element => {
      element.addEventListener(type, listener);
      element[`${type} event`] = listener;
    });
  }

  off(type) {
    this.each(element => element.removeEventListener(type, element[`${type} event`]));
  }
}

module.exports = DomNodeCollection;
