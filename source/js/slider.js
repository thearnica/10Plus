import $ from 'jquery';
import './slick.js';

if (window.matchMedia("(max-width: 639px)").matches) {
  const services = document.querySelector('.services__list');
  if(services) {
    $(document).ready(function () {
      $('.services__list').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
      });
    });
  }
}
