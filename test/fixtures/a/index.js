// @jsx ctx.element

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
      value: <span>{String(state.value)}</span>
    };

    function decr() {
      state.value -= 1;
      ctx.patch(refs.value, <span>{String(state.value)}</span>);
    }

    function incr() {
      state.value += 1;
      ctx.patch(refs.value, <span>{String(state.value)}</span>);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        ctx.log("resize");
      });
    }

    return (
      <div hooks={hooks}>
        <button events={{ click: decr }}>+</button>
        {refs.value}
        <button events={{ click: incr }}>+</button>
      </div>
    );
  };
}
