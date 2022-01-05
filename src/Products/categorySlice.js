import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../API/client'

const initialState = []

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await client.get('https://aveosoft-react-assignment.herokuapp.com/categories')
  return response.data
})

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {}
})

export default categorySlice.reducer