import {
  addClassTo,
  attachLayoutScrollHandler,
  inTime,
  Q,
  QSA,
  removeClassFrom,
  waterfall, willRemoveClassFrom,
  withSeal
} from "../block/global";

const isTablet = window.matchMedia("(max-width: 1023px)").matches;

if (Q('.page.page--talent')) {

  const pageStart = () => {
    withSeal(function () {
      addClassTo('.header', 'header--hidden', true);
      addClassTo('.talent__title', 'talent__title--hidden', true);
      addClassTo('.talent__content', 'talent__content--hidden', true);
    });
  };

  const startAnimation = () => {
    pageStart();

    waterfall([
      inTime(300),
      inTime(0, () => removeClassFrom('.page', 'page--hidden')),
      inTime(300),
      inTime(0, willRemoveClassFrom('.talent__title', 'talent__title--hidden')),
      inTime(250),
      inTime(0, willRemoveClassFrom('.header', 'header--hidden')),
      inTime(0, willRemoveClassFrom('.talent__content', 'talent__content--hidden')),
    ]);
  };

  const getTalentId = (block) => {
    return Q('.talent__mobile-image', block).id;
  };


  const boxDistance = (b1, b2) => {
    const b1y = b1.top + b1.height / 2;
    const b2y = b2.top + b2.height / 2;
    return Math.abs(b2y - b1y);
  };

  const fixedImageBlock = Q('.talent__fixed');
  const imageBlock = Q('.talent__images');
  const list = Q('.talent__list');
  const activeCaptionClassName = 'talent__caption--active';
  const activeLinkClassName = 'talent__link--active';
  const talents = QSA('.talent__item', list).filter(item => Boolean(Q(".talent__caption", item)));

  imageBlock.innerHTML = talents.map(item => {
    const talent = getTalentId(item);
    return `
      <picture class="talent__image  talent__image--hidden" data-talentid="${talent}">
        <source type="image/webp" srcset="./images/${talent}.webp 1x, ./images/${talent}@2x.webp 2x">
        <img src="./images/${talent}.png" srcset="./images/${talent}@2x.png 2x" alt="${talent}">
      </picture>
    `;
  }).join('\n');

  const onListScroll = () => {
    // find the most visible item
    const listBox = {
      top: 0,
      height: window.innerHeight
    };
    const matches = talents
      .map(item => ({
        item,
        box: item.getBoundingClientRect()
      }))
      .map(item => ({
        ...item,
        score: boxDistance(listBox, item.box)
      })).sort((a, b) => a.score - b.score)
      .map(({item}) => item);

    matches.forEach((item) => {
      Q(".talent__caption", item).classList.remove(activeCaptionClassName);
      Q(".talent__link", item).classList.remove(activeLinkClassName);
      Q(`[data-talentid="${getTalentId(item)}"]`).classList.add('talent__image--hidden');
    });

    const bestMatch = matches[0];

    Q(".talent__caption", bestMatch).classList.add(activeCaptionClassName);
    Q(".talent__link", bestMatch).classList.add(activeLinkClassName);
    Q(`[data-talentid="${getTalentId(bestMatch)}"]`).classList.remove('talent__image--hidden');
  };

  const images = QSA('.talent__image img', fixedImageBlock);

  const items = QSA('.talent__item', list);

  const setHeightForItem = () => {
    items.forEach((item, index) => {
      item.style.height = images[0].clientHeight + 'px';
      if (index !== items.length - 1) {
        item.style.marginBottom = "calc(50vh - " + images[0].clientHeight + "px)"
      }
    });
  };

  const title = Q('.talent__title');

  const setOffset = () => {
    const offset = (window.innerHeight / 2) - (48 + 80 + (images[0].clientHeight / 2) + title.clientHeight);

    if (window.matchMedia("(max-width: 1439px)").matches && offset > 80) {
      title.style.marginBottom = offset + "px"
    }

    if (window.matchMedia("(min-width: 1440px)").matches &&  offset > 80) {
      title.style.marginBottom = offset + "px"
    }
  };

  const footer = Q('.footer');

  const setListMargin = () => {
    list.style.marginBottom = "calc(50vh - " + (images[0].clientHeight / 2 + footer.clientHeight) + "px)"
  };

  const setFixedPosition = () => {
    fixedImageBlock.style.height = images[0].clientHeight + "px";
    fixedImageBlock.style.top = "calc(50vh - " + images[0].clientHeight / 2 + "px)"
  };

  const links = QSA('.talent__link', list);

  const content = Q('.talent__content');

  const setWidthForLink = () => {
    links.forEach((link) => {
      link.style.width = content.clientWidth + 'px';
    });
  };

  startAnimation();

  if (!isTablet) {
    attachLayoutScrollHandler(onListScroll, window);
    onListScroll();
    images[0].addEventListener('load', setOffset);
    images[0].addEventListener('load', setHeightForItem);
    images[0].addEventListener('load', setListMargin);
    images[0].addEventListener('load', setFixedPosition);
    setWidthForLink();
  }
}
