import { Cursor, Pointer, init } from "../../dist/index.js";

const pointer1 = new Pointer({
  speed: 0.05,
  element: document.querySelector(".curs"),
});

const cursor1 = new Cursor({
  pointers: [pointer1],
});

const cursor1Cleanup = cursor1.initCursor();

init();
