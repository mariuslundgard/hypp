# hypp

A tiny library for building modern DOM nodes fast with (or without) JSX.

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
// @jsx element
// @jsxFrag fragment

import { element, fragment } from "hypp";

const events = {
  click() {
    console.log("Hello, world");
  }
};

document.body.appendChild(element("button", { events }, "Click me"));
```

## License

MIT © [Marius Lundgård](https://mariuslundgard.com/)
