import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useLogin from "../../hooks/useLogin";
import { loginSchema } from "../../validations/loginSchema";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate, isPending, error } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate(formData, {
        abortEarly: false,
      });

      setErrors({});

      mutate(formData, {
        onSuccess: () => {
          const redirectTo =
            location.state?.from?.pathname || "/shop";
 
          navigate(redirectTo, {
            replace: true,
          });
        },
      });
    } catch (validationError) {
      const newErrors = {};

      validationError.inner?.forEach((error) => {
        if (!newErrors[error.path]) {
          newErrors[error.path] = error.message;
        }
      });

      setErrors(newErrors);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0b09] px-4 text-[#f4efe7]">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#b89b72]">
            The Art of Oud
          </p>

          <h1 className="font-serif text-4xl tracking-widest">
            ÉLORIA
          </h1>

          <p className="mt-3 text-sm text-[#a9a29a]">
            Welcome back
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-[#c9c1b7]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full rounded-xl border border-[#3a342e] bg-[#15120f] px-4 py-3 text-sm text-[#f4efe7] outline-none placeholder:text-[#746d65] focus:border-[#b89b72]"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-[#c9c1b7]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full rounded-xl border border-[#3a342e] bg-[#15120f] px-4 py-3 text-sm text-[#f4efe7] outline-none placeholder:text-[#746d65] focus:border-[#b89b72]"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          {/* Login error */}
          {error && (
            <p className="text-sm text-red-400">
              {error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-[#b89b72] px-4 py-3 text-sm font-medium text-black transition hover:bg-[#d0b58d] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-[#a9a29a]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#b89b72] hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;  