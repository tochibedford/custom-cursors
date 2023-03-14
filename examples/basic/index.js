import { Cursor, Pointer, init } from "../../dist/index.js";

const pointer1 = new Pointer({
  speed: 1,
  element: document.querySelector(".curs"),
  xOffset: 50,
  yOffset: 50,
});

const pointer2 = new Pointer({
  speed: 0.05,
  element: document.querySelector(".curs2"),
});

const cursor1 = new Cursor({
  pointers: [pointer1, pointer2],
});

const cursor1Cleanup = cursor1.initCursor();

init();
