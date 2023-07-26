"use client";

import Image from "next/image";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div className=" w-screen  h-[80vh] flex flex-col justify-center  items-center">
      <Image
        loading="lazy"
        src="/images/error/ErrorPage.avif"
        alt="ErrorImg"
        width={350}
        height={350}
        style={{ borderRadius: "15px" }}
      />
      <button
        onClick={reset}
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;
