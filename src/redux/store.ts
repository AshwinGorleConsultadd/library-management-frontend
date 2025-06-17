import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../slices/counterSlice'
import weatherSlice from './sclices/weatherSlice'
import suggestionsSlice from './sclices/suggestionsSlice'
import authSlice from './sclices/authSlice'
import bookSlice from './sclices/bookSlice'
import memberSlice from './sclices/memberSlice'
// ...

export const store = configureStore({
  reducer: {
    suggestions : suggestionsSlice,
    auth : authSlice,
    book : bookSlice,
    member : memberSlice

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch