import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";
import toast from "react-hot-toast";
import useAdminLogin from "../../hooks/useAdminLogin";

const inputStyle =
  "w-full rounded-lg border border-[#3a3028] bg-[#0b0908] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#b99a63]";

const labelStyle = "mb-2 block text-sm text-[#d8cec3]";

const AdminLogin = () => {
  const navigate = useNavigate();
  const adminLogin = useAdminLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    adminLogin.mutate(formData, {
      onSuccess: () => {
        toast.success("Welcome to ÉLORIA Admin");
        navigate("/admin", { replace: true });
      },
      onError: (error) => {
        toast.error(error.message || "Unable to login");
      },
    })                                       
  }

  return (
    <div className="min-h-screen bg-[#0b0908] px-4 py-10 text-[#f5efe6]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <div className="w-full rounded-2xl border border-[#3a3028] bg-[#120f0d] p-8 shadow-2xl">

          <div className="mb-8 text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#b99a63]">
              ÉLORIA
            </p>

            <h1 className="font-serif text-3xl">
              Admin Portal
            </h1>

            <p className="mt-2 text-sm text-[#a79d93]">
              Sign in to manage your store.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8e8175]"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@eloria.com"
                  required
                  className={inputStyle}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={labelStyle}>
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8e8175]"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className={inputStyle}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={adminLogin.isPending}
              className="w-full rounded-lg bg-[#b89b72] py-3 text-sm font-medium text-[#17120e] transition hover:bg-[#c9ac78] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {adminLogin.isPending ? "Signing in..." : "Sign In"}
            </button>

          </form>
        </div>
      </div>
    </div>
  )}

export default AdminLogin;
