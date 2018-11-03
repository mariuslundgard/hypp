import { CUSTOM_ATTRS, LOWER_CASE } from "./constants";

const propsCache = new WeakMap();

const SUPPORTS_CUSTOM_ELEMENTS = typeof customElements !== "undefined";

function addEvents(elm, events) {
  Object.keys(events).forEach(eventType => {
    elm.addEventListener(eventType, events[eventType]);
  });
}

function removeEvents(elm, events) {
  Object.keys(events).forEach(eventType => {
    elm.removeEventListener(eventType, events[eventType]);
  });
}

function addStyle(elm, style) {
  if (typeof style === "string") {
    elm.style = style;
  } else {
    Object.keys(style).forEach(prop => {
      elm.style[prop] = style[prop];
    });
  }
}

const elementClasses = {
  div: HTMLDivElement,
  pre: HTMLPreElement,
  ul: HTMLUListElement
};

function createRandomString(len = 5) {
  let str = "";
  let i;

  for (i = 0; i < len; i += 1) {
    str += LOWER_CASE.charAt(Math.floor(Math.random() * LOWER_CASE.length));
  }

  return str;
}

function createUniqueCustomElementName(prefix = "x") {
  let key = null;
  while (!key) {
    const k = `${prefix}-${createRandomString()}`;
    key = !customElements.get(k) && k;
  }
  return key;
}

function createLifecycleElement(name, hooks) {
  if (!SUPPORTS_CUSTOM_ELEMENTS) {
    console.warn("The environment does not support the Custom Elements API");
    return document.createElement(name);
  }

  const BaseClass = elementClasses[name];

  if (!BaseClass) {
    throw new Error(`No base class for <${name}>`);
  }

  const is = createUniqueCustomElementName();

  class XElement extends BaseClass {
    adoptedCallback(...args) {
      if (hooks.adopt) {
        hooks.adopt(...args);
      }
    }
    attributeChangedCallback(...args) {
      if (hooks.attributeChange) {
        hooks.attributeChange(...args);
      }
    }
    connectedCallback(...args) {
      if (hooks.connect) {
        hooks.connect(...args);
      }
    }
    disconnectedCallback(...args) {
      if (hooks.disconnect) {
        hooks.disconnect(...args);
      }
    }
  }

  if (hooks.observedAttributes) {
    XElement.observedAttributes = hooks.observedAttributes;
  }

  customElements.define(is, XElement, { extends: name });

  return document.createElement(name, { is });
}

export function element(name, props, ...children) {
  props = props || {};

  if (typeof name === "string") {
    const elm = props.hooks
      ? createLifecycleElement(name, props.hooks)
      : document.createElement(name);

    propsCache.set(elm, props);

    if (props.events) {
      addEvents(elm, props.events);
    }

    if (props.style) {
      addStyle(elm, props.style);
    }

    Object.keys(props).forEach(attrKey => {
      if (CUSTOM_ATTRS.indexOf(attrKey) === -1) {
        elm.setAttribute(attrKey, props[attrKey]);
      }
    });

    elm.appendChild(fragment(children));

    return elm;
  } else {
    props.children = fragment(children);

    const elm = name(props);

    propsCache.set(elm, props);

    return elm;
  }
}

export function empty(elm) {
  const len = elm.childNodes.length;

  let i;

  for (i = len - 1; i >= 0; i -= 1) {
    elm.removeChild(elm.childNodes[i]);
  }
}

export function fragment(children) {
  const frag = document.createDocumentFragment();

  children = Array.isArray(children) ? children : [children.children];

  if (Array.isArray(children[0])) children = children[0];

  children.filter(Boolean).forEach(child => {
    if (typeof child === "string") {
      frag.appendChild(text(child));
    } else {
      frag.appendChild(child);
    }
  });

  return frag;
}

export function text(str) {
  return document.createTextNode(str);
}

function getType(node) {
  if (node.nodeType === 1) return "element";
  if (node.nodeType === 3) return "text";
  return -1; // unknown
}

function replace(oldNode, newNode) {
  if (oldNode.parentNode) {
    oldNode.parentNode.insertBefore(newNode, oldNode);
    oldNode.parentNode.removeChild(oldNode);
  }
  return newNode;
}

function patchProps(a, b) {
  const aProps = propsCache.get(a);
  const bProps = propsCache.get(b);

  // update props
  if (aProps !== bProps) {
    const aPropKeys = Object.keys(aProps);
    const bPropKeys = Object.keys(bProps);

    // remove props
    aPropKeys
      .filter(propKey => bPropKeys.indexOf(propKey) === -1)
      .forEach(propKey => a.removeAttribute(propKey));

    // set props
    bPropKeys
      .filter(propKey => aProps[propKey] !== bProps[propKey])
      .forEach(propKey => a.setAttribute(propKey, bProps[propKey]));

    // replace events
    if (aProps.events) removeEvents(a, aProps.events);
    if (bProps.events) addEvents(a, bProps.events);

    // update cache
    propsCache.set(a, bProps);
  }
}

function patchChildren(a, b) {
  const aLen = a.childNodes.length;
  const bLen = b.childNodes.length;
  const len = Math.max(aLen, bLen);
  const appendNodes = [];
  const removeNodes = [];

  let i;
  for (i = 0; i < len; i += 1) {
    const aChild = a.childNodes[i];
    const bChild = b.childNodes[i];

    if (!aChild) {
      appendNodes.push(bChild);
    } else if (!bChild) {
      removeNodes.push(aChild);
    } else {
      patch(aChild, bChild);
    }
  }

  removeNodes.forEach(node => a.removeChild(node));
  appendNodes.forEach(node => a.appendChild(node));
}

export function patch(a, b) {
  const aType = getType(a);
  const bType = getType(b);

  if (aType !== bType) return replace(a, b);

  const type = aType;

  if (type === "element") {
    if (a.nodeName !== b.nodeName) return replace(a, b);
    patchProps(a, b);
    patchChildren(a, b);
  } else if (type === "text") {
    a.textContent = b.textContent;
  }

  return a;
}
