/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDb } from "@/firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addTodo,
  deleteTodo,
  getAllTodos as getAllUserTodos,
} from "../redux/slices/TodoSlice";
import { toast } from "react-toastify";
import { Todo } from "../types";
import Modal from "../components/Modal";
import Loader from "../components/shared/Loader";

export default function Home() {
  const user = useSelector((store: RootState) => store.user.user);
  const { loading, todos } = useSelector((store: RootState) => store.todo);
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState<Todo | null>(null);
  const [open, setOpen] = useState(false);

  function openModalHandler(ele: Todo) {
    setOpen(true);
    setTodo(ele);
  }

  async function addDataHandler() {
    if (!user) {
      return toast.error("Please Login!!");
    }
    if (!value) {
      return toast.error("Please Enter Value!!");
    }
    try {
      await dispatch(addTodo({ user, value })).unwrap();
      await dispatch(getAllUserTodos(user)).unwrap();
      toast.success("Success");
      setValue("");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    }
  }

  async function delete_todo(id: string) {
    if (!user) {
      return toast.error("Please Login!!");
    }
    await dispatch(deleteTodo(id)).unwrap();
    await dispatch(getAllUserTodos(user)).unwrap();
  }

  useEffect(() => {
    if (user?.uid) {
      dispatch(getAllUserTodos(user)).unwrap();
    }
  }, [user?.uid, dispatch]);

  return (
    <main className="flex flex-col items-center p-10">
      <div className="flex md:w-7/12 w-full ">
        <input
          type="text"
          className="w-full mr-2 py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Add a task"
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button
          onClick={addDataHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
      {user ? (
        <ul className="divide-y divide-gray-300 md:w-7/12 w-full pt-8">
          {loading && <Loader />}
          {!loading &&
            todos &&
            todos.map((ele) => {
              return (
                <li
                  key={ele.id}
                  className="flex items-center justify-between py-2"
                >
                  <span className=" text-white">{ele.content}</span>
                  <div className="flex row-auto items-center">
                    <button
                      onClick={() => openModalHandler(ele)}
                      type="button"
                      className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => delete_todo(ele.id)}
                      type="button"
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      ) : (
        <h1>Please Login</h1>
      )}
      {open && todo && <Modal todo={todo} handleClose={() => setOpen(false)} />}
    </main>
  );
}
