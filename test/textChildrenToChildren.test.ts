import {
  unsafeLocalizedString,
  makeTextChildrenFromElements,
  bold,
  lineBreak,
  textChildrenToChildren,
} from "../src";

const formatMessage = unsafeLocalizedString;

describe("textChildrenToChildren", () => {
  test("regular string", () => {
    const input = formatMessage("Hello");
    expect(textChildrenToChildren(input)).toMatchInlineSnapshot(`
      Array [
        "Hello",
      ]
    `);
  });

  test("lineBreak", () => {
    const input = makeTextChildrenFromElements(lineBreak);
    expect(textChildrenToChildren(input)).toMatchInlineSnapshot(`
      Array [
        <br />,
      ]
    `);
  });

  test("bold", () => {
    const input = makeTextChildrenFromElements(bold(formatMessage("Bold text")));
    expect(textChildrenToChildren(input)).toMatchInlineSnapshot(`
      Array [
        <ForwardRef
          as="b"
          fontWeight="bodyStrong"
        >
          Bold text
        </ForwardRef>,
      ]
    `);
  });

  test("array of regular strings", () => {
    const input = makeTextChildrenFromElements([formatMessage("Hello"), formatMessage("World")]);
    expect(textChildrenToChildren(input)).toMatchInlineSnapshot(`
      Array [
        "Hello",
        "World",
      ]
    `);
  });

  test("mixed array of regular strings and bold", () => {
    const input = makeTextChildrenFromElements([
      formatMessage("Hello"),
      bold(formatMessage("World")),
      formatMessage("!"),
    ]);
    expect(textChildrenToChildren(input)).toMatchInlineSnapshot(`
      Array [
        "Hello",
        <ForwardRef
          as="b"
          fontWeight="bodyStrong"
        >
          World
        </ForwardRef>,
        "!",
      ]
    `);
  });

  test("mixed array with line breaks", () => {
    const input = makeTextChildrenFromElements([
      formatMessage("First"),
      bold(formatMessage("line")),
      lineBreak,
      bold(formatMessage("Second")),
      formatMessage("line"),
    ]);
    expect(textChildrenToChildren(input)).toMatchInlineSnapshot(`
      Array [
        "First",
        <ForwardRef
          as="b"
          fontWeight="bodyStrong"
        >
          line
        </ForwardRef>,
        <br />,
        <ForwardRef
          as="b"
          fontWeight="bodyStrong"
        >
          Second
        </ForwardRef>,
        "line",
      ]
    `);
  });
});
