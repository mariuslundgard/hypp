# hypp

A tiny library for building modern DOM nodes fast with (or without) JSX.

[![npm version](https://img.shields.io/npm/v/hypp.svg?style=flat-square)](http://browsenpm.org/package/hypp)

## Installing

```sh
npm install --save hypp
```

## Basic usage

```js
// @jsx element

import { element } from "hypp";

const events = {
  click() {
    console.log("Hello, world");
  }
};

document.body.appendChild(<button events={events}>Click me</button>);
```

The same example without JSX:

```js
import { element } from "hypp";

const events = {
  click() {
    console.log("Hello, world");
  }
};

document.body.appendChild(element("button", { events }, "Click me"));
```

### Components

```jsx
// @jsx element

import { element, patch } from "hypp";

function Counter(props) {
  const state = { count: 0 };

  const refs = {
    count: <span>{String(state.count)}</span>
  };

  function decr() {
    state.count--;
    patch(refs.count, <span>{String(state.count)}</span>);
  }

  function incr() {
    state.count++;
    patch(refs.count, <span>{String(state.count)}</span>);
  }

  return (
    <div>
      {refs.count}
      <button events={{ click: decr }}>-</button>
      <button events={{ click: incr }}>+</button>
    </div>
  );
}

document.body.appendChild(<Counter count={0} />);
```

### Fragments

```jsx
// @jsx element
// @jsxFrag fragment

import { element, fragment } from "hypp";

document.body.appendChild(
  <>
    <strong>Fragments are cool</strong> because they let me avoid wrapping
    elements in a root element!
  </>
);
```

### Lifecycle hooks

```jsx
// @jsx element

import { element, patch } from "hypp";

// A component that always knows the size of the window
function SizeAware() {
  const state = {
    width: -1,
    height: -1
  };

  const hooks = {
    connect() {
      window.addEventListener("resize", handleResize);
    },

    disconnect() {
      window.removeEventListener("resize", handleResize);
    }

    // Also supported:

    // adapt () {
    //   ...
    // }

    // observedAttributes: ['id'],

    // attributeChange (attrKey, oldValue, newValue) {
    //   ...
    // }
  };

  function handleResize(applyPatch = true) {
    state.width = window.innerWidth;
    state.height = window.innerHeight;

    // Patch the DOM
    if (applyPatch) patch(refs.root, view());
  }

  function view() {
    return (
      <div
        hooks={hooks}
        style={`width: ${state.width}px; height: ${state.height}px`}
      >
        <span>{String(state.width)}</span> &times;{" "}
        <span>{String(state.height)}</span>
      </div>
    );
  }

  // Call resize handler to get initial window size
  handleResize(false);

  // Render DOM
  refs.root = view();

  return refs.root;
}

document.body.appendChild(<SizeAware />);
```

## License

MIT © [Marius Lundgård](https://mariuslundgard.com/)
