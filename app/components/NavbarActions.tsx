"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { signInWithPopup, signOut } from "firebase/auth";
import { GoogleProvider, firebaseAuth } from "@/firebase/firebase.config";
import { AppDispatch, RootState } from "../redux/store";
import { logOut, setUser } from "../redux/slices/UserAuthSlice";
import { toast } from "react-toastify";

type Props = {};

export default function NavbarActions({}: Props) {
  const user = useSelector((store: RootState) => store.user.user);
  const dispatch = useDispatch<AppDispatch>();
  async function SignInWithGoogle() {
    try {
      const user = await signInWithPopup(firebaseAuth, GoogleProvider);
      const data = {
        displayName: user.user.displayName,
        email: user.user.email,
        photoURL: user.user.photoURL,
        uid: user.user.uid,
      };
      dispatch(setUser(data));
      toast.success("Login Successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    }
  }
  async function logoutHandler() {
    try {
      await signOut(firebaseAuth);
      dispatch(logOut({}));
      toast.success("LogOut Successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    }
  }
  return (
    <ul className="ml-4 flex items-center space-x-4">
      {!user && (
        <li>
          <button
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
            onClick={SignInWithGoogle}
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Google
          </button>
        </li>
      )}
      {user && (
        <>
          <li className="flex items-center space-x-2 text-white hover:text-gray-300">
            <Image
              width={50}
              height={50}
              src={user.photoURL || "/images/DefaultUserImage.avif"}
              alt="User Avatar"
              className="h-8 w-8 rounded-full"
            />
            <span>{user?.displayName}</span>
          </li>
          <li>
            <button
              onClick={logoutHandler}
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Log Out
            </button>
          </li>
        </>
      )}
    </ul>
  );
}
