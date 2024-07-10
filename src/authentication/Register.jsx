import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // navigation systems
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/index";

  // handle register
  const onSubmit = (data) => {
    const { email, password, image, name } = data;

    if (password.length < 6) {
      setPasswordError("Password must be 6 characters");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must have at least 1 Uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must have at least 1 Lowercase letter");
      return;
    }

    setPasswordError("");

    //create user and update profile
    createUser(email, password)
      .then(() => {
        logOut();
        Swal.fire({
          title: 'Registration Successful!',
          text: 'Now, you can login.',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        updateUserProfile(name, image).then(() => {
          navigate(from);
        });
      })
      .catch((error) => setPasswordError(error.message));
  };

  return (
    <div>
      <Helmet>
        <title>Register | ProReferral</title>
      </Helmet>
      <div className="py-3 lg:py-6 my-5">
        <p className="text-center pb-3 text-2xl md:text-5xl text-blue-500 font-bold">
          Register Here
        </p>
        <div className="rounded-xl mx-auto bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2">
            <div className="form-control w-[300px] md:w-[450px] px-5 mx-auto">
              <label className="label">
                <span className="label-text text-lg text-orange-500 font-medium">
                  Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="form-control w-[300px] md:w-[450px] px-5 mx-auto">
              <label className="label">
                <span className="label-text text-lg text-orange-500 font-medium">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="form-control w-[300px] md:w-[450px] px-5 mx-auto">
              <label className="label">
                <span className="label-text text-lg text-orange-500 font-medium">
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="Your Photo URL"
                className="input input-bordered"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="form-control w-[300px] md:w-[450px] px-5 mx-auto">
              <label className="label">
                <span className="label-text text-lg text-orange-500 font-medium">
                  Password
                </span>
              </label>
              <div className="flex flex-col">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered relative"
                  {...register("password", { required: true })}
                />
                <span
                  className="absolute translate-x-56 md:translate-x-96 translate-y-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </span>
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
                {passwordError && (
                  <small className="text-red-500">{passwordError}</small>
                )}
              </div>
            </div>

            <div className="form-control mt-6 w-[300px] md:w-[450px] px-5 mx-auto col-span-1 md:col-span-2">
              <button className="btn btn-outline border-2 text-orange-500 hover:bg-blue-500 hover:border-0">
                Register
              </button>
              <div className="pt-2">
              <p>
                Already have an account? Login{" "}
                <Link to="/login" className="text-violet-600 font-medium">
                  here
                </Link>{" "}
              </p>
            </div>
            </div>

           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
