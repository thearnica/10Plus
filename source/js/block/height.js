import {Q, withNoTransitionOn} from "./global";

export const measureHeightAndGet = (selector) => {
  let height;
  withNoTransitionOn(selector, function () {
    let el = Q(selector);
    let prevH = el.style.height;
    let prevMH = el.style.maxHeight;
    el.style.height = 'auto';
    el.style.maxHeight = '100%';

    height = el.offsetHeight;
    el.style.height = prevH;
    el.style.maxHeight = prevMH;
    el.offsetHeight;
  });
  return height;
};
