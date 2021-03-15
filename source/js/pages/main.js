import {inTime, Q, removeClassFrom, waterfall, willRemoveClassFrom} from "../block/global";
import {mainPageStart, onMainPageScroll} from "./startMainPage";

if (Q('.page.page--home')) {

  const startAnimation = () => {
    mainPageStart();

    waterfall([
      inTime(300),
      inTime(0, () => removeClassFrom('.page', 'page--hidden')),
      inTime(300),
      inTime(0, willRemoveClassFrom('.promo__title', 'promo__title--hidden')),
      inTime(250),
      inTime(0, willRemoveClassFrom('.header', 'header--hidden')),
    ]);

    onMainPageScroll();
  };

  startAnimation();
}
