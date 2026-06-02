"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  };

  function toggleConfirmPasswordVisibility() {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  async function handleCustomSignIn(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ name, email, password, confirmPassword })
    })

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);

      setTimeout(() => {
        router.push('/sign-in');
      }, 500);
    }
    else {
      toast.error(data.message);
    }

  };

  return (
    <div className="py-10 flex items-center justify-center min-h-screen bg-gray-100">

      <Link href={'/'} className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300">
        <BiArrowBack className="w-6 h-6" />
      </Link>

      <ToastContainer />

      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-sm:w-80">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Sign Up
        </h1>

        <form onSubmit={handleCustomSignIn} className="flex flex-col gap-2">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />

          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              required
            />
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2 text-slate-500 opacity-50">
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              required
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-2 text-slate-500 opacity-50">
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <Link href={'/sign-in'} className="text-slate-600 text-sm cursor-pointer hover:text-blue-500">Already Have An Account?</Link>

          <button type="submit" className="px-6 py-3 max-sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Sign Up</button>

        </form>

        <div className="flex justify-center my-2 text-slate-500">OR</div>

        <div className="flex flex-col gap-4">
          <button onClick={() => signIn("google", { callbackUrl: '/my-snippets' })} className="flex items-center justify-center gap-2 px-6 py-3 max-sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
            <FaGoogle /> Sign up with Google
          </button>

          <button onClick={() => signIn("github", { callbackUrl: '/my-snippets' })} className="flex items-center justify-center gap-2 px-6 py-3 max-sm:py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-300">
            <FaGithub /> Sign up with GitHub
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          By signing up, you agree to our{" "}
          <span className="text-blue-600">Terms of Service</span>{" "}
          and{" "}
          <span className="text-blue-600">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default SignIn;