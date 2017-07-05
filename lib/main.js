import DOMNodeCollection from './dom_node_collection';

const _docReadyCallbacks = [];
let _docReady = false;

const $l = (selector) => {
  switch(typeof(selector)) {
    case "function":
      return registerDocReadyCallback(arg);
    case "object":
      if (selector instanceof HTMLElement) {
        return new DOMNodeCollection([selector]);
      }
    case "string":
      const nodeList = document.querySelectorAll(selector);
      const nodesArray = Array.from(nodeList);
      return new DOMNodeCollection(nodesArray);
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
