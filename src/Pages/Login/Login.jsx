/* eslint-disable react/no-unknown-property */

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {

  const { googleLogin, signInUser,githubLogin } = useContext(AuthContext)
  const navigate = useNavigate()

    const { register, handleSubmit,reset } = useForm();

    const onSubmit = (data) => {
      signInUser(data.email, data.password)
      .then((result) => {
        toast.success("User logged in Successfully.");
        navigate("/dashboard");
        reset()
        console.log(result.user);
      })
      .catch((error) => {
        toast.error(`${error.message}`);
        console.log(error.message);
      });
    };


    const handleGoogleLogin = () =>{
      googleLogin()
      .then((result) => {
        toast.success("User logged in Successfully.");
        navigate("/dashboard");
        console.log(result.user);
      })
      .catch((error) => {
        toast.error(`${error.message}`);
        console.log(error.message);
      });
    }

    const handleGithubLogin = () =>{
      githubLogin()
      .then((result) => {
        toast.success("User logged in Successfully.");
        navigate("/dashboard");
        console.log(result.user);
      })
      .catch((error) => {
        toast.error(`${error.message}`);
        console.log(error.message);
      });
    }

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-base-300">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1 text-sm">
            <label for="username" className="block ">
              Email 
            </label>
            <input
            required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              {...register("email",{ required: true})}
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
            
          </div>
          <div className="space-y-1 text-sm">
            <label for="password" className="block ">
              Password
            </label>
            <input
            required
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              {...register("password",{ required: true})}
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
             
          </div>
          <button type="submit" className="block w-full p-3 text-center rounded-sm text-white bg-[#4A00FF]">
            Sign in
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm ">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4 py-2">
         
            <button onClick={handleGoogleLogin}>
            <FaGoogle size={24} />
            </button>
            <button onClick={handleGithubLogin}>
            <FaGithub size={24} />
            </button>
        </div>
        <Link to="/register">
        <p className="text-xs text-center sm:px-6 ">
          Do not have an account?
          <span className="underline font-bold">
            Register Now
          </span>
        </p>
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
