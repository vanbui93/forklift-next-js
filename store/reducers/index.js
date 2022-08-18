import { combineReducers } from 'redux'
import accountReducer from './account'
import cmtReducer from './cmt'
import colorsReducer from './colors'
import mainReducer from './main'
import menuReducer from './menus'
import mobileMenuReducer from './mobileMenu'
import orderReducer from './order'
import pageReducer from './page'
import productDetailReducer from './productDetail'
import productReducer from './products'
import promotionReducer from './promotion'
import skusReducer from './skus'
import slideReducer from './slides'
import storageReducer from './storage'
import uiReducer from './ui'
import videosReducer from './videos'
import warantysReducer from './warantys'

const rootReducer = combineReducers({
    main: mainReducer,
    products: productReducer,
    product: productDetailReducer,
    ui: uiReducer,
    hambuger: mobileMenuReducer,
    menu: menuReducer,
    order: orderReducer,
    account: accountReducer,
    slides: slideReducer,
    cmt: cmtReducer,
    colors: colorsReducer,
    skus: skusReducer,
    videos: videosReducer,
    warantys: warantysReducer,
    promotions: promotionReducer,
    page: pageReducer,
    mediaStorage: storageReducer,
})

export default rootReducer
