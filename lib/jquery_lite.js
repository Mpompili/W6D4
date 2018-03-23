/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(1);

// document.addEventListener("DOMContentLoaded", function() {

  window.$l = function (input){

    switch (typeof input){
      case 'string':
        let nodeList = Array.from(document.querySelectorAll(input));
        return new DomNodeCollection(nodeList);
      case 'object':
        let htmlElement = [document.getElementById(input)];
        return new DomNodeCollection(htmlElement);
      case 'function':
        let functions = [];
        functions.push(input);
    }
  };

  $l.extend = function(...obj) {
    return Object.assign(...obj);
  };


//
// });


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);