/**
 * @jest-environment node
 */

import { element, fragment } from "../src/server";
import createA from "./fixtures/a";

describe("hypp/server", () => {
  describe("element", () => {
    it("should render element", () => {
      expect(<div>foo</div>).toBe(`<div>foo</div>`);
    });

    it("should render style (string)", () => {
      expect(<div style="color: red">foo</div>).toBe(
        `<div style="color: red">foo</div>`
      );
    });

    it("should render style (object)", () => {
      expect(
        <div style={{ color: "red", borderTop: "1px solid red" }}>foo</div>
      ).toBe(`<div style="color: red; border-top: 1px solid red;">foo</div>`);
    });

    it("should ignore special props", () => {
      expect(
        <div events={{}} hooks={{}}>
          foo
        </div>
      ).toBe(`<div>foo</div>`);
    });
  });

  describe("component", () => {
    it("should render component", () => {
      function NestedComp() {
        return <span>nested</span>;
      }
      function Comp() {
        return (
          <div>
            <NestedComp />
          </div>
        );
      }
      expect(<Comp />).toBe(`<div><span>nested</span></div>`);
    });

    it("should render component with DOM-effects to HTML", () => {
      const log = jest.fn();
      const A = createA({ element, log });

      expect(<A />).toBe(
        "<div><button>+</button><span>0</span><button>+</button></div>"
      );
    });
  });

  describe("fragment", () => {
    it("should render fragment", () => {
      expect(<>foo</>).toBe("foo");
    });
  });
});
