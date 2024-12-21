"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const router = useRouter();

    const { data: session, status } = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleCustomSignIn(event: React.FormEvent) {
        event.preventDefault();

        setIsSubmitting(true);

        const response = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (response?.ok) {
            toast.success("Sign In Successfull");
            setTimeout(() => {
                // Instead of router.push, we use a reload to ensure session state is properly updated
                window.location.href = '/my-snippets';
            }, 1000);
        } else {
            toast.error(response?.error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100">

            <Link href={'/'} className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300">
                <BiArrowBack className="w-6 h-6" />
            </Link>

            <ToastContainer />

            <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-sm:w-80">
                <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Sign In
                </h1>

                <form onSubmit={handleCustomSignIn} className="flex flex-col gap-2">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />

                    <Link href={'/sign-up'} className="text-slate-600 text-sm cursor-pointer hover:text-blue-500">Create An Account?</Link>

                    <button disabled={isSubmitting} className="px-6 py-3 max-sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">{isSubmitting ? 'Signing In...' : 'Sign In'}</button>
                </form>

                <div className="flex justify-center my-2 text-slate-500">OR</div>

                <div className="flex flex-col gap-4">
                    <button onClick={() => signIn("google", { callbackUrl: '/my-snippets' })} className="flex items-center justify-center gap-2 px-6 py-3 max-sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                        <FaGoogle /> Sign in with Google
                    </button>

                    <button onClick={() => signIn("github", { callbackUrl: '/my-snippets' })} className="flex items-center justify-center gap-2 px-6 py-3 max-sm:py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-300">
                        <FaGithub /> Sign in with GitHub
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4">
                    By signing in, you agree to our{" "}
                    <span className="text-blue-600">Terms of Service</span>{" "}
                    and{" "}
                    <span className="text-blue-600">Privacy Policy</span>.
                </p>
            </div>
        </div>
    );
};

export default SignIn;