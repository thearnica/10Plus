import {lockyOn} from "dom-locky";
import {inTime, waterfall} from "./global";

let unlock = 0;

export const openNavigation = (selector) => {
  const page = document.querySelector('.page');

  waterfall([
    inTime(1, selector.classList.add("modal-navigation--animation")),
    inTime(0, selector.classList.remove("modal-navigation--hidden")),
    inTime(0, page.classList.add("page--no-scroll")),
  ]);

  unlock = lockyOn(selector);
  selector.style.height = (window.innerHeight) + 'px';
};

export const closeNavigation = (selector) => {
  const page = document.querySelector('.page');

  waterfall([
    inTime(0, page.classList.remove("page--no-scroll")),
    inTime(300, selector.classList.remove("modal-navigation--animation")),
    inTime(0, selector.classList.add("modal-navigation--hidden")),
    inTime(0, () => selector.style.height = 0)
  ]);

  unlock && unlock();
  unlock=0;
};

export const setupNavigationClose = (modal) => {
  const button = modal.querySelector('#close-toggle');

  if (!button) {
    return;
  }

  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeNavigation(modal);
  });

  button.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      closeNavigation(modal);
    }
  });
};

export const setupNavigation = (callButton, callModal, callback) => {
  if (!callButton) {
    return;
  }

  callButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (callModal.classList.contains('modal-navigation--animation')) {
      closeNavigation(callModal);
    }
    else {
      callback && callback();
      openNavigation(callModal);
    }
  });

  callButton.addEventListener('keydown', function (evt) {
    evt.preventDefault();

    if (evt.keyCode === 13) {
      if (callModal.classList.contains('modal-navigation--animation')) {
        closeNavigation(callModal);
      }
      else {
        callback && callback();
        openNavigation(callModal);
      }
    }
  });

  setupNavigationClose(callModal);
};

