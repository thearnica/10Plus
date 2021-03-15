import {easeInOutQuad, progressTo} from "./progression";

export const countUp = ($el, from, to, duration = 1000) => {
  progressTo(from, to, 0, duration, 50, easeInOutQuad, (v) => $el.innerHTML = v)
};
