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
// @jsxFrag fragment

import { element, fragment } from "hypp";

const events = {
  click() {
    console.log("Hello, world");
  }
};

document.body.appendChild(<button events={events}>Click me</button>);
```

The same example without JSX:

```js
import { element, fragment } from "hypp";

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

import { element } from "hypp";

function Counter(props) {
  const state = { count: 0 };

  const refs = {
    count: <span>{String(state.count)}</span>
  };

  function decr() {
    state.count--;
    refs.count.firstChild.textContent = String(state.count);
  }

  function incr() {
    state.count++;
    refs.count.firstChild.textContent = String(state.count);
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

import { element } from "hypp";

// A component that always knows the size of the window
function SizeAware() {
  const state = {
    width: -1,
    height: -1
  };

  const refs = {
    width: <span>{String(state.width)}</span>,
    height: <span>{String(state.height)}</span>,
    root: null
  };

  function handleResize() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;

    // Update DOM
    refs.width.firstChild.textContent = String(state.width);
    refs.height.firstChild.textContent = String(state.height);
    refs.root.style = `width: ${state.width}px; height: ${state.height}px`;
  }

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

  refs.root = (
    <div
      hooks={hooks}
      style={`width: ${state.width}px; height: ${state.height}px`}
    >
      width={refs.width} height={refs.height}
    </div>
  );

  // Call resize handler to get initial window size
  handleResize();

  return refs.root;
}

document.body.appendChild(<SizeAware />);
```

## License

MIT © [Marius Lundgård](https://mariuslundgard.com/)
