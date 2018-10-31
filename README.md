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

## License

MIT © [Marius Lundgård](https://mariuslundgard.com/)
