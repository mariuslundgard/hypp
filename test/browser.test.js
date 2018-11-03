/**
 * @jest-environment jsdom
 */

import { element, fragment, patch } from "../src/browser";
import createA from "./fixtures/a";

describe("hypp", () => {
  describe("element", () => {
    it("should create an element", () => {
      const elm = <div />;

      expect(elm.nodeName).toBe("DIV");
    });

    it("should set attributes", () => {
      const elm = <div class="foo" id="bar" data-key="baz" />;

      expect(elm.className).toBe("foo");
      expect(elm.id).toBe("bar");
      expect(elm.getAttribute("data-key")).toBe("baz");
    });

    it("should add style (object)", () => {
      const elm = <div style={{ color: "red" }} />;

      expect(elm.style.color).toBe("red");
    });

    it("should add style (string)", () => {
      const elm = <div style="color: red;" />;

      expect(elm.style.color).toBe("red");
    });
  });

  describe("fragment", () => {
    it("should create a fragment", () => {
      const frag = <>foo</>;

      expect(frag).toBeInstanceOf(DocumentFragment);
      expect(frag.childNodes[0].textContent).toBe("foo");
    });
  });

  describe("component", () => {
    it("should create component with DOM-effects", () => {
      const log = jest.fn();
      const A = createA({ element, fragment, log, patch });

      const elm = <A />;
      const decrBtn = elm.firstChild;
      const valueText = elm.childNodes[1].firstChild;
      const incrBtn = elm.lastChild;

      decrBtn.click();
      expect(valueText.textContent).toBe("-1");

      incrBtn.click();
      expect(valueText.textContent).toBe("0");
    });
  });

  describe("patch", () => {
    it("should add events", () => {
      const click = jest.fn();
      const a = <div>foo</div>;
      const b = <div events={{ click }}>foo</div>;

      patch(a, b);
      a.click();

      expect(click.mock.calls).toHaveLength(1);
    });

    it("should remove events", () => {
      const click = jest.fn();
      const a = <div events={{ click }}>foo</div>;
      const b = <div>foo</div>;

      patch(a, b);
      a.click();

      expect(click.mock.calls).toHaveLength(0);
    });

    it("should replace element", () => {
      let a = <div />;
      const b = <p>foo</p>;

      a = patch(a, b);

      expect(a.nodeName).toBe("P");
      expect(a.firstChild.textContent).toBe("foo");
    });

    it("should replace nested element", () => {
      const a = (
        <div>
          <span>foo</span>
        </div>
      );
      const b = (
        <div>
          <strong>foo</strong>
        </div>
      );

      patch(a, b);

      expect(a.firstChild.nodeName).toBe("STRONG");
      expect(a.firstChild.firstChild.textContent).toBe("foo");
    });

    it("should patch text", () => {
      const a = <span>foo</span>;
      const b = <span>bar</span>;

      patch(a, b);

      expect(a.firstChild.textContent).toBe("bar");
    });

    it("should patch attributes", () => {
      const a = <span id="foo" class="foo" />;
      const b = <span id="bar" hidden />;

      patch(a, b);

      expect(a.hasAttribute("class")).toBe(false);
      expect(a.id).toBe("bar");
      expect(a.hasAttribute("hidden")).toBe(true);
    });

    it("should remove children", () => {
      const a = (
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      );
      const b = (
        <ul>
          <li>3</li>
        </ul>
      );

      patch(a, b);

      expect(a.childNodes.length).toBe(1);
      expect(a.firstChild.firstChild.textContent).toBe("3");
    });

    it("should append children", () => {
      const a = (
        <ul>
          <li>3</li>
        </ul>
      );
      const b = (
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      );

      patch(a, b);

      expect(a.childNodes.length).toBe(3);
      expect(a.childNodes[0].firstChild.textContent).toBe("1");
      expect(a.childNodes[1].firstChild.textContent).toBe("2");
      expect(a.childNodes[2].firstChild.textContent).toBe("3");
    });
  });
});
