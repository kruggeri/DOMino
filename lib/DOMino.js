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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor (array) {
    this.array = array;
  }
}

DOMNodeCollection.prototype.html = function (string) {
  if (!string) {
    return this.array[0].innerHTML;
  } else {
    this.array.forEach(node => {
      node.innerHTML = string;
    });
    return this;
  }
};

DOMNodeCollection.prototype.empty = function () {
  this.array.forEach(node => {
    node.innerHTML = "";
  });

  return this;
};

DOMNodeCollection.prototype.append = function (arg) {
  this.array.forEach(node => {
    if (typeof arg === "string") {
      node.innerHTML += arg;
    } else {
      arg.array.forEach(arg2 => {
        node.innerHTML += arg2.outerHTML;
      });
    }
  });

  return this;
};

DOMNodeCollection.prototype.attr = function (key, value) {
  this.array.forEach(node => {
    node.setAttribute(key, value);
  });
};

DOMNodeCollection.prototype.addClass = function (className) {
  this.array.forEach(node => {
    node.classList.add(className);
  });
};

DOMNodeCollection.prototype.removeClass = function (className) {
  this.array.forEach(node => {
    node.classList.remove(className);
  });
};

DOMNodeCollection.prototype.children = function () {
  let nodeArray = [];
  this.array.forEach(node => {
    nodeArray = nodeArray.concat(Array.prototype.slice.call(node.children));
  });
  return new DOMNodeCollection(nodeArray);
};

DOMNodeCollection.prototype.parent = function () {
  let nodeArray = [];
  this.array.forEach(node => {
    nodeArray = nodeArray.concat([node.parentNode]);
  });
  return new DOMNodeCollection(nodeArray);
};


DOMNodeCollection.prototype.find = function (selector) {
  let collection = [];
  this.array.forEach(node => {
    collection = collection.concat(Array.from(node.querySelectorAll(selector)));
  });
  return new DOMNodeCollection(collection);
};

DOMNodeCollection.prototype.remove = function () {
  this.array.forEach(child => {
    child.parentNode.removeChild(child);
  });
  this.empty();
};

DOMNodeCollection.prototype.on = function (eventName, callback) {
    this.array.forEach(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `jqliteEvents-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

DOMNodeCollection.prototype.off = function (eventName) {
    this.array.forEach(node => {
      const eventKey = `jqliteEvents-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach(callback => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }


module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dom_node_collection__);


const _docReadyCallbacks = [];
let _docReady = false;

const $l = (selector) => {
  switch(typeof(selector)) {
    case "function":
      return registerDocReadyCallback(arg);
    case "object":
      if (selector instanceof HTMLElement) {
        return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection___default.a([selector]);
      }
    case "string":
      const nodeList = document.querySelectorAll(selector);
      const nodesArray = Array.from(nodeList);
      return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection___default.a(nodesArray);
  }
};

window.$l = $l;

const registerDocReadyCallback = (func) => {
  if(!_docReady){
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

$l.extend = (base, ...otherObjs) => {
  otherObjs.forEach( obj => {
    for(let prop in obj){
      base[prop] = obj[prop];
    }
  });
  return base;
};


$l.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = (e) => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( func => func() );
});


/***/ })
/******/ ]);