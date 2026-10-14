import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useRegister from "../../hooks/useRegister";
import { registerSchema } from "../../validations/registerSchema";

const Register = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useRegister();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "", 
  })

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })
    setErrors({
      ...errors,
      [name]: "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await registerSchema.validate(formData, {
        abortEarly: false,
      });

      setErrors({})

      mutate(formData, {
        onSuccess: () => {
          navigate("/shop");
        },
      });
    } catch (validationError) {
      const newErrors = {};

      validationError.inner?.forEach((error) => {
        if (!newErrors[error.path]) {
          newErrors[error.path] = error.message
        }
      })  

      setErrors(newErrors)
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0b09] px-4 text-[#f4efe7]">
      <div className="w-full max-w-md">

        <div className="mb-10 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#b89b72]">
            The Art of Oud
          </p>

          <h1 className="font-serif text-4xl tracking-widest">
            ÉLORIA
          </h1>

          <p className="mt-3 text-sm text-[#a9a29a]">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}

          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#3a342e] bg-[#15120f] px-4 py-3 text-sm outline-none focus:border-[#b89b72]"
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#3a342e] bg-[#15120f] px-4 py-3 text-sm outline-none focus:border-[#b89b72]"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>


          {/* Password */}

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#3a342e] bg-[#15120f] px-4 py-3 text-sm outline-none focus:border-[#b89b72]"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          {/* API error */}

          {error && (
            <p className="text-sm text-red-400">
              {error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-[#b89b72] px-4 py-3 text-sm text-black transition hover:bg-[#d0b58d] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending
              ? "Creating account..."
              : "Create Account"}
          </button>

          <p className="text-center text-sm text-[#a9a29a]">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-[#b89b72] hover:underline"
            >
              Sign in
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
};

export default Register;