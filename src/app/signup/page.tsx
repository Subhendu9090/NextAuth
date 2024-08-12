"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const responce = await axios.post("/api/users/signup", user);

      console.log("signup success", responce);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" p-2 text-3xl">{loading ? "processing " : "Signup"}</h1>
      <hr />
      <label htmlFor="username"
      className="p-2 "
      >username</label>
      <input
      className=" w-1/3 bg-gray-100 rounded-lg text-black h-10"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email"
      className="p-2 ">email</label>
      <input
      className=" w-1/3 bg-gray-100 rounded-lg text-black h-10"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password"
      className="p-2 ">password</label>
      <input
        className=" w-1/3 bg-gray-100 rounded-lg text-black h-10"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
      className=" my-3 py-3 bg-blue-500 rounded-2xl px-4"
      onClick={onSignup}>
        {buttonDisabled? " No signup" : "signup"}
      </button>
      <Link href={"/login"}
      className=" text-blue-300 underline"
      >visit login page</Link>
    </div>
  );
}
