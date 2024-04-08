"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const onSignUp = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      setLoading(false);
      route.push("/login");
      console.log(response);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div>
      SignupPage
      {loading ? "Processing" : "Sucessfully Sign Up"}
      <div>
        <label htmlFor="username">User Name</label>
        <input
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          type="text"
          placeholder="User Name"
        />
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
        <button onClick={(e) => onSignUp(e)}>
          {buttonDisabled ? "No Sign Up" : "SIgn Up"}
        </button>
        <Link href={"/login"}>Already Sign Up Visit Login</Link>
      </div>
    </div>
  );
};

export default SignupPage;
