import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginOwner, registerOwner } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("owner1@example.com");
  const [password, setPassword] = useState("123456");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = isSignup
        ? await registerOwner(name, email, password)
        : await loginOwner(email, password);

      setAuthData(data.token, data.owner);
      navigate("/restaurants");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden lg:flex flex-col justify-between bg-neutral-950 text-white p-10 xl:p-14">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06C167] text-lg font-bold text-white">
              R
            </div>
            <div>
              <p className="text-sm text-neutral-300">Restaurant Console</p>
              <h1 className="text-lg font-semibold">Restaurant Frontend Service</h1>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-neutral-200">
              Built for restaurant owners
            </div>

            <h2 className="text-5xl font-bold leading-[1.02] tracking-tight">
              Manage your restaurant
              <span className="block text-[#06C167]">faster and cleaner.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-neutral-300">
              Sign in to manage restaurant details, menu cards, and menu items
              from one clean dashboard.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">01</p>
                <p className="mt-2 text-sm text-neutral-300">Create and manage restaurants</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">02</p>
                <p className="mt-2 text-sm text-neutral-300">Set location from the map</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">03</p>
                <p className="mt-2 text-sm text-neutral-300">Control menu items easily</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-neutral-400">
            Clean admin experience inspired by modern delivery platforms
          </p>
        </div>

        <div className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06C167] text-lg font-bold text-white">
                  R
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Restaurant Console</p>
                  <h1 className="text-base font-semibold text-neutral-950">
                    Restaurant Frontend Service
                  </h1>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="inline-flex rounded-2xl bg-neutral-100 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(false);
                    setError("");
                  }}
                  className={`rounded-2xl px-5 py-2.5 text-sm font-medium transition ${
                    !isSignup
                      ? "bg-white text-neutral-950 shadow-sm"
                      : "text-neutral-500"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(true);
                    setError("");
                  }}
                  className={`rounded-2xl px-5 py-2.5 text-sm font-medium transition ${
                    isSignup
                      ? "bg-white text-neutral-950 shadow-sm"
                      : "text-neutral-500"
                  }`}
                >
                  Sign up
                </button>
              </div>

              <h2 className="mt-6 text-4xl font-bold tracking-tight text-neutral-950">
                {isSignup ? "Create owner account" : "Welcome back"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                {isSignup
                  ? "Create a restaurant owner account to start managing your restaurants and menus."
                  : "Sign in to access your restaurant dashboard and manage operations."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              {isSignup ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              ) : null}

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-14 w-full items-center justify-center rounded-2xl bg-[#06C167] px-4 text-sm font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? isSignup
                    ? "Creating account..."
                    : "Signing in..."
                  : isSignup
                  ? "Create account"
                  : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-500">
              {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                }}
                className="font-semibold text-neutral-950 underline underline-offset-4"
              >
                {isSignup ? "Login here" : "Sign up here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;