"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const VerifyEmailpage = () => {
  const [token, setToken] = useState<string>("");
  const [verified, setverified] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = axios.post("/api/users/verifyemail", { token });
      setverified(true);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    let urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      VerifyEmailpage
      <h1 className="text-4xl">Verify Email</h1>
      <h2>{token ? `${token}` : "No token"}</h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailpage;
