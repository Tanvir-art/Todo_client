/* eslint-disable react/no-unknown-property */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
    const {createUser,updateUserProfile,userLogOut} = useContext(AuthContext)
    const navigate = useNavigate()
  const { register, handleSubmit,reset} = useForm();

  const onSubmit = (data) => {
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){
        return toast.error("Invalid Email.")
    }
    if(data.password.length <6){
        return toast.error("password is less than 6 characters")
    }
    if(!/[A-Z]/.test(data.password)){
        return toast.error("password  don't have a capital letter")
    }
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)){
        return toast.error("password  don't have a special character")
    }
    
    createUser(data.email,data.password)
    .then(()=>{
      
        updateUserProfile(data.name,data.photo)
        .then(()=>{
            toast.success("User Created Successfully.")
            userLogOut()
            navigate('/login')
            reset()
        })
        
    })
   .catch(error=>{
    toast.error(`${error.message}`) 
    console.log(error.message)
   })
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-base-300">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1 text-sm">
            <label for="photo" className="block ">
              Photo URL
            </label>
            <input
              required
              type="text"
              name="photo"
              id="photo"
              placeholder="Photo URL"
              {...register("photo", { required: true })}
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label for="name" className="block ">
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder="name"
              {...register("name", { required: true })}
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label for="email" className="block ">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: true})}
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>

          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm text-white bg-[#4A00FF]"
          >
            Register
          </button>
        </form>

        <Link to="/login">
          <p className="text-xs text-center pt-5">
            Already have an account?
            <span className="underline font-bold">Login Now</span>
          </p>
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;