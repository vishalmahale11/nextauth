"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const onLogin = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      setLoading(false);
      route.push("/login");
      console.log(response);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.password.length > 0 && user.email.length > 0) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div>
      LoginPage
      {loading ? "Processing" : "Sucessfully Login Up"}
      <div>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
          placeholder="Email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Password"
        />
        <button onClick={(e) => onLogin(e)}>
          {buttonDisabled ? "No Login" : "Login"}
        </button>
        <Link href={"/signup"}>Already Login Up Visit Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
