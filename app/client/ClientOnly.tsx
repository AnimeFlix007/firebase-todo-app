"use client";

import { useEffect, useState, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ClientOnly = ({ children }: Props) => {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(true);
  }, []);
  if (!display) {
    return null;
  }
  return <>{children}</>;
};

export default ClientOnly;
