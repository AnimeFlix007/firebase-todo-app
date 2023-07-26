import { Todo, User } from "@/app/types";
import { firebaseDb } from "@/firebase/firebase.config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";

type initialState = {
  todos: Todo[] | undefined;
  loading: boolean;
};

const initialState: initialState = {
  todos: [],
  loading: false,
};

export const getAllTodos = createAsyncThunk(
  "todo/get",
  async (payload: User, { fulfillWithValue, rejectWithValue }) => {
    try {
        const q: any = query(
          collection(firebaseDb, "todos"),
          where("uid", "==", payload.uid)
        );
        const snapShot = await getDocs(q);
        const res: Todo[] = [];
        snapShot.forEach((doc: any) => {
          res.push({ ...doc.data(), id: doc.id });
        });
        return fulfillWithValue(res);
      } catch (error: any) {
        rejectWithValue(error.message || "Something went wrong!");
      }
  }
);

export const todoSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTodos.pending, (state, action) => {
        state.loading = true;
        state.todos = [];
    });
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
    });
    builder.addCase(getAllTodos.rejected, (state, action) => {
        state.loading = false;
        
    });
  },
});
