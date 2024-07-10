import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // navigation systems
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/index";

  // handle email login
  const onSubmit = (data) => {
    const { email, password } = data;

    setLoginError("");

    login(email, password)
      .then((result) => {
        toast.success("Login successful!");
        if (result.user) {
          navigate(from);
        }
      })
      .catch((error) => {
        toast.error("Password or Email did not match!");
        setLoginError(error.message);
      });
  };

  // handle direct login
  const handleDirectLogin = (socialProvider) => {
    socialProvider()
      .then((result) => {
        console.log(result.user);
        if (result.user) {
          navigate(from);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Login | ProReferral</title>
      </Helmet>
      <div className="py-3 lg:py-6 my-5 grid grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div>
        <p className="text-center text-3xl text-blue-500 font-bold">
          Login to your account
        </p>
        <div className="rounded-xl mx-auto p-3 w-[300px] md:w-[450px] bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
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
            <div className="form-control">
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
                  className="input input-bordered"
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
                {loginError && (
                  <small className="text-red-500">{loginError}</small>
                )}
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline border-2 text-orange-500 hover:bg-blue-500 hover:border-0">
                Login
              </button>
            </div>
            <div className="pt-2">
              <p>
                No account? Register{" "}
                <Link to="/register" className="text-violet-600 font-medium">
                  here
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
        </div>
        
        
        <div className="text-center space-y-3">
          <p className="text-center text-2xl text-blue-500 font-bold">
            Or continue with
          </p>
          {/* Google Login */}
          <button
            className="btn btn-outline border-2 text-orange-500 hover:bg-blue-500 hover:border-0"
            onClick={() => handleDirectLogin(googleLogin)}
          >
            <FaGoogle />
            Login with Google
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
