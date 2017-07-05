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
