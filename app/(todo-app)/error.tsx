"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  const router = useRouter();
  return error.message;
};

export default Error;
