import {setupNavigation} from "./navigationSetup";

const callNavigation = document.querySelector('#js-toggle');
const navigation = document.querySelector('.modal-navigation');

setupNavigation(callNavigation, navigation);

