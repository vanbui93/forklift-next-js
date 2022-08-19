import { combineReducers } from 'redux'
import accountReducer from './account'
import blogReducer from './blogs'
import collectionReducer from './collections'
import mainReducer from './main'
import menuReducer from './menus'
import mobileMenuReducer from './mobileMenu'
import orderReducer from './order'
import pageReducer from './page'
import productDetailReducer from './productDetail'
import productReducer from './products'
import slideReducer from './slides'
import storageReducer from './storage'
import uiReducer from './ui'
import videosReducer from './videos'

const rootReducer = combineReducers({
    main: mainReducer,
    products: productReducer,
    product: productDetailReducer,
    ui: uiReducer,
    hambuger: mobileMenuReducer,
    menu: menuReducer,
    collection: collectionReducer,
    order: orderReducer,
    account: accountReducer,
    slides: slideReducer,
    videos: videosReducer,
    page: pageReducer,
    blog: blogReducer,
    mediaStorage: storageReducer,
})

export default rootReducer
