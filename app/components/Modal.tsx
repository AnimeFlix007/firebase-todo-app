"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import { Todo } from "../types";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "@/firebase/firebase.config";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos as getAllUserTodos } from "../redux/slices/TodoSlice";
import { toast } from "react-toastify";

type Props = {
  todo: Todo;
  handleClose: () => void;
};

export default function Modal({ todo, handleClose }: Props) {
  const user = useSelector((store: RootState) => store.user.user);
  const [value, setValue] = useState<string | undefined>("");
  const dispatch = useDispatch<AppDispatch>();
  const onInnerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };
  async function updateHandler() {
    if (!user) {
      return toast.error("Please Login!!");
    }
    const docRef = doc(firebaseDb, "todos", todo.id);
    await updateDoc(docRef, {
      ...todo,
      content: value,
    });
    handleClose();
    await dispatch(getAllUserTodos(user)).unwrap();
  }

  useEffect(() => {
    setValue(todo?.content);
  }, [todo?.content]);

  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
      onClick={handleClose}
    >
      <div
        className=" relative  w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6mx-auto  h-full  lg:h-auto md:h-auto bg-gray-700 rounded-3xl"
        onClick={onInnerClick}
      >
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Edit Item
          </h3>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </div>
            <div className="flex items-center justify-center space-x-2 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={updateHandler}
              >
                Update
              </button>
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
