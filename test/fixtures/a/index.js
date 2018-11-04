// @jsx ctx.element

const isBrowser = typeof window !== "undefined";

export default function create(ctx) {
  return function App(props) {
    const state = {
      value: props.value || 0
    };

    const hooks = {
      connect() {
        ctx.log("connect!");
      }
    };

    const refs = {
      value: ctx.text(String(state.value))
    };

    function decr() {
      console.log("decr");
      state.value -= 1;
      ctx.patch(refs.value, ctx.text(String(state.value)));
    }

    function incr() {
      console.log("decr");
      state.value += 1;
      ctx.patch(refs.value, ctx.text(String(state.value)));
    }

    if (isBrowser) {
      window.addEventListener("resize", () => {
        ctx.log("resize");
      });
    }

    return (
      <div hooks={hooks}>
        <button events={{ click: decr }}>-</button>
        <span>{refs.value}</span>
        <button events={{ click: incr }}>+</button>
      </div>
    );
  };
}
