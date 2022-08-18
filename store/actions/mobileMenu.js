import * as hambugerTypes from './../constants/mobileMenu';

export const showHamburger = () => ({
  type: hambugerTypes.SHOW_HAMBUGER,
})

export const hideHamburger = () => ({
  type: hambugerTypes.HIDE_HAMBUGER,
})