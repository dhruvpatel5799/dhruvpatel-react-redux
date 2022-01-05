import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../API/client'

const initialState = []

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await client.get('https://aveosoft-react-assignment.herokuapp.com/products')
  return response.data
})

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export default productSlice.reducer

export const selectProductById = (state, productId) => 
  state.products.find((product) => product.id === Number(productId))