"use client";

import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center">
      <ClipLoader size={30} loading={true} color="white" />
    </div>
  );
}
