import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserAuthSlice";
import { todoSlice } from "./slices/TodoSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    todo: todoSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;