import paramCase from "param-case";

import { CUSTOM_ATTRS } from "./constants";

function compileStyle(styleObj) {
  return Object.keys(styleObj)
    .map(prop => {
      return `${paramCase(prop)}: ${styleObj[prop]};`;
    })
    .join(" ");
}

function compileProps(props) {
  if (!props) return "";
  return Object.keys(props)
    .filter(
      propKey => propKey === "style" || CUSTOM_ATTRS.indexOf(propKey) === -1
    )
    .map(propKey => {
      if (propKey === "style" && typeof props[propKey] === "object") {
        return ` style="${compileStyle(props[propKey])}"`;
      }
      return ` ${propKey}="${props[propKey]}"`;
    })
    .join("");
}

export function element(name, props, ...children) {
  if (typeof name === "function") {
    props = props || {};
    props.children = children;
    return name(props);
  }
  return `<${name}${compileProps(props)}>${children.join("")}</${name}>`;
  return "";
}

export function fragment({ children }) {
  return children.join("");
}

export function text(str) {
  return str;
}

export function patch() {
  throw new Error("Not a server function: `patch()`");
}

export function empty() {
  throw new Error("Not a server function: `empty()`");
}
