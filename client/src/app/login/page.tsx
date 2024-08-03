"use client";

import { useForm } from "react-hook-form";

export default function Login() {
  const form = useForm();
  const { register } = form;
  return (
    <>
      <form className="App">
        <input type="text" />
        <input type="email" />
        <input type="password" />
        <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}
