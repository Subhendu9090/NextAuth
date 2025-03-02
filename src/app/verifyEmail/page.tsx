"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    console.log(window.location);
    
    const urlToken = window.location.search.split("=")[1];

    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">verify Email</h1>
        <h2 className=" p-2 bg-orange-500 text-black">
            {token ?`${token}`:"notoken"}
        </h2>
        {verified && (
            <div>
                <h2> Verified</h2>
                <Link href={"/login"}>login</Link>
            </div>

        )}
        {error && (
            <div>
                <h2> error</h2>
            </div>

        )}
  </div>
  );
}
