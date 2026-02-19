import { $ } from "../lib/dom.js";
import { TYPING } from "../config.js";

export function startTyping() {
  const out = $("#typing");
  if (!out) return;

  let i = 0,
    j = 0,
    dir = 1,
    pause = 0;

  const tick = () => {
    const text = TYPING[i];

    if (pause > 0) {
      pause--;
      setTimeout(tick, 30);
      return;
    }

    j += dir;
    out.textContent = text.slice(0, j);

    if (dir === 1 && j >= text.length) {
      pause = 26;
      dir = -1;
    } else if (dir === -1 && j <= 0) {
      dir = 1;
      i = (i + 1) % TYPING.length;
      pause = 8;
    }

    setTimeout(tick, dir === 1 ? 45 : 28);
  };

  tick();
}
