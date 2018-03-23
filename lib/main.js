const DomNodeCollection = require('./dom_node_collection');

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
