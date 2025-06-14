import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "../components/index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex item-center justify-center">
      <div
        classNmae={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <sapn className="inline-block w-full max-w-[100px]">
            <Logo width="100px" />
          </sapn>
        </div>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign up to create an account
      </h2>
      <p className="mt-2 text-center text-base text-black/60">
        Already have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign up{" "}
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(create)} className="mt-8">
        <div className="space-y4">
          <input
            lable="Full Name: "
            placeholder="Email"
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none"
            {...register("name", { required: true })}
          />
          <Input
            lable="Email: "
            type="Email"
            placeholder="Enter your Email"
            className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-black focus:outline-none"
            {...register("email", {
              required: true,
              validate: (value) => {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address";
              },
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
