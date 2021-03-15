import {
  addClassTo,
  inTime,
  Q,
  removeClassFrom,
  waterfall,
  willRemoveClassFrom,
  withSeal
} from "../block/global";

if (Q('.page.page--person')) {

  const pageStart = () => {
    withSeal(function () {
      addClassTo('.header', 'header--hidden', true);
      addClassTo('.person__title', 'person__title--hidden', true);
      addClassTo('.person__content', 'person__content--hidden', true);
    });
  };

  const startAnimation = () => {
    pageStart();

    waterfall([
      inTime(300),
      inTime(0, () => removeClassFrom('.page', 'page--hidden')),
      inTime(300),
      inTime(0, willRemoveClassFrom('.person__title', 'person__title--hidden')),
      inTime(250),
      inTime(0, willRemoveClassFrom('.header', 'header--hidden')),
      inTime(0, willRemoveClassFrom('.person__content', 'person__content--hidden')),
    ]);
  };

  startAnimation();
}
