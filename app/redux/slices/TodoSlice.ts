import { Todo, User } from "@/app/types";
import { firebaseDb } from "@/firebase/firebase.config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

type initialState = {
  todos: Todo[] | undefined;
  loading: boolean;
};

type AddTodoPayload = {
  user: User;
  value: string;
};

type updateTodoPayload = {
  todo: Todo;
  content: string;
};

const initialState: initialState = {
  todos: [],
  loading: false,
};

export const getAllTodos = createAsyncThunk(
  "todo/getAll",
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

export const addTodo = createAsyncThunk(
  "todo/add",
  async (payload:AddTodoPayload, { fulfillWithValue, rejectWithValue }) => {
    try {
      await addDoc(collection(firebaseDb, "todos"), {
        uid: payload.user.uid,
        content: payload.value,
        complete: false,
      })
      return fulfillWithValue({msg: "Added Successfully"})
    } catch (error: any) {
      rejectWithValue(error.message || "Something went wrong!");
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/update",
  async (payload: updateTodoPayload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const docRef = doc(firebaseDb, "todos", payload.todo.id);
      await updateDoc(docRef, {
        ...payload.todo,
        content: payload.content,
      });
      return fulfillWithValue({msg: "Added Successfully"})
    } catch (error: any) {
      rejectWithValue(error.message || "Something went wrong!");
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (id: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      await deleteDoc(doc(firebaseDb, "todos", id));
      return fulfillWithValue({msg: "Deleted Successfully"})
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
    //get all todos
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
