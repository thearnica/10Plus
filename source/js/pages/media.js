import {
  addClassTo,
  inTime,
  Q,
  removeClassFrom,
  waterfall,
  willRemoveClassFrom,
  withSeal
} from "../block/global";

if (Q('.page.page--media')) {

  const pageStart = () => {
    withSeal(function () {
      addClassTo('.header', 'header--hidden', true);
      addClassTo('.full-screen', 'full-screen--hidden', true);
      addClassTo('.full-screen__title', 'full-screen__title--hidden', true);
      addClassTo('.full-screen__text', 'full-screen__text--hidden', true);
    });
  };

  const startAnimation = () => {
    pageStart();

    waterfall([
      inTime(300),
      inTime(0, () => removeClassFrom('.page', 'page--hidden')),
      inTime(300),
      inTime(0, willRemoveClassFrom('.full-screen__title', 'full-screen__title--hidden')),
      inTime(250),
      inTime(0, willRemoveClassFrom('.header', 'header--hidden')),
      inTime(0, willRemoveClassFrom('.full-screen__text', 'full-screen__text--hidden')),
      inTime(0, willRemoveClassFrom('.full-screen', 'full-screen--hidden')),
    ]);
  };

  startAnimation();
}
