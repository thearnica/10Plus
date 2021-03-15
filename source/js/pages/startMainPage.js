import {addClassTo, attachScrollHandler, getBoundingClientRect, QSA, trySeal, withSeal} from "../block/global";

var advElements = QSA('.services__title, .services__item, .network__title, .network__note, .network__item, .network__text, .features__item, .links__title, .links__item');

function withNoAnimationDelay(selector) {
  var elements = QSA(selector);
  elements.pop();

  elements.forEach(function (el) {
    el.dataset.noAnimationDelay = true;
  })

}

export const mainPageStart = () => {
  withSeal(function () {
    addClassTo('.header', 'header--hidden', true);
    addClassTo('.promo__title', 'promo__title--hidden', true);
    advElements.forEach(trySeal);

    addClassTo('.services__title', 'services__title--hidden', true);
    addClassTo('.services__item', 'services__item--hidden', true);

    addClassTo('.network__title', 'network__title--hidden', true);
    addClassTo('.network__note', 'network__note--hidden', true);
    addClassTo('.network__item', 'network__item--hidden', true);
    addClassTo('.network__text', 'network__text--hidden', true);

    addClassTo('.features__item', 'features__item--hidden', true);

    addClassTo('.links__title', 'links__title--hidden', true);
    addClassTo('.links__item', 'links__item--hidden', true);

    withNoAnimationDelay('.services__item');
    withNoAnimationDelay('.network__item');
    withNoAnimationDelay('.links__item');
  });
};

//blocks
export const  onMainPageScroll = () => {
  var advElementsState = [];
  var advElementsOperationCount = 0;

  const onScroll = () => {
    var height = window.innerHeight;
    var bottom = height;

    advElements
      .map(function (item) {
        return {
          position: getBoundingClientRect(item),
          item: item,
        }
      })
      .sort(function (a, b) {
        var diff = a.position.top - b.position.top;
        if (Math.abs(diff) < 10) {
          return (a.position.left - b.position.left);
        }
        return diff;
      })
      .forEach(function (itemRecord, index) {
        var itemPosition = itemRecord.position;
        var item = itemRecord.item;
        var itemTop = itemPosition.top;
        if (itemTop < bottom - height / 3.5) {
          if (!advElementsState[index]) {
            advElementsState[index] = true;
            setTimeout(function () {
              item.classList.remove('services__title--hidden');
              item.classList.remove('services__item--hidden');

              item.classList.remove('network__title--hidden');
              item.classList.remove('network__note--hidden');
              item.classList.remove('network__item--hidden');
              item.classList.remove('network__text--hidden');

              item.classList.remove('features__item--hidden');

              item.classList.remove('links__title--hidden');
              item.classList.remove('links__item--hidden');

              advElementsOperationCount = Math.max(0, advElementsOperationCount - 1);
            }, +(item.dataset.animationDelay || 0) + Math.min(2000, (advElementsOperationCount++) * 300));
            if (item.dataset.noAnimationDelay) {
              advElementsOperationCount--;
            }
          }
        }
      });
  };

  attachScrollHandler(onScroll);

  setTimeout(() => onScroll(), 600);
};
