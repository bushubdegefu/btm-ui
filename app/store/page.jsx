"use client";
import dynamic from "next/dynamic";
// import TipTapEditor from "../components/generic/tiptap";

const TipTapPilot = dynamic(
  () => import("@/app/components/generic/tiptap_pilot"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <TipTapPilot />
    </>
  );
}
