const fullScreenBlocks = document.querySelector('.full-screen');

const setHeight = () => {
  if (fullScreenBlocks) {
    fullScreenBlocks.style.height = (window.innerHeight - 80) + 'px';
  }
};

const promoBlock = document.querySelector('.promo');

const setPromoHeight = () => {
  if (promoBlock) {
    promoBlock.style.height = window.innerHeight + 'px';
  }
};

setHeight();
setPromoHeight();
