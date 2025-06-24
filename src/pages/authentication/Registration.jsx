import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    //console.log(createUser);
    createUser(data.email, data.password)
    .then( result => {
      console.log(result.user);
    })
    .catch(error => {
      console.log(error);
    })
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold">Create An Account!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              name = "email"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              name = "password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.passworde?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.passworde?.type === "minLength" && (
              <p className="text-red-500">
                Password length should be minimum 6 character
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;

//test@gmail.com
//Test@123