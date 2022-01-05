import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './Products/productsSlice'

export default configureStore({
  reducer: {
    products: productsReducer,
  }
})