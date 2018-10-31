export function addEvents(elm, events) {
  Object.keys(events).forEach(eventType => {
    elm.addEventListener(eventType, events[eventType]);
  });
}

export function addStyle(elm, style) {
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

const LOWER_CASE = "abcdefghijklmnopqrstuvwxyz";
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

const CUSTOM_ATTRS = ["events", "hooks", "style"];
export function element(name, props, ...children) {
  props = props || {};

  if (typeof name === "string") {
    const elm = props.hooks
      ? createLifecycleElement(name, props.hooks)
      : document.createElement(name);

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

    return name(props);
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
