// A native implementation of one-way binding
// to minimize painting delays.

function updateContent(element, content) {
  element.textContent = content;
}

function buildBindList(container, attribute) {
  window.binds = container.querySelectorAll(attribute);
}

function applyBinds() {
  for(var i = 0; i < window.binds.length; ++i) {
    window.binds[i].textContent = window.binds[i].attr
  }
}

function applyClassName(element, className) {
  
}

