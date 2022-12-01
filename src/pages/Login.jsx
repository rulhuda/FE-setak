import axios from "../api/axios";
import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import API_ENDPOINT from "../globals/api-endpoint.js";
import AuthContext from "../contexts/Auth";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const { auth, setAuth } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onHandleChange = async (e) => {
    e.preventDefault();

    const { id, value } = e.target;

    setForm((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { username, password } = form;
      const postLogin = await axios.post(API_ENDPOINT.LOGIN_POST, {
        username,
        password,
      });

      if (postLogin.data.error !== false) {
        setIsLoading(false);
        return Swal.fire(
          "Login gagal!",
          "Username atau password tidak cocok!",
          "error"
        );
      }
      setIsLoading(false);
      setAuth(postLogin.data);
      Swal.fire("Login berhasil!", "", "success");
      setForm({ username: "", password: "" });
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing username or Password!");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized!");
      }
      // errRef.current.focus();
    }
  };

  const onReset = async (e) => {
    e.preventDefault();
    setForm({ username: "", password: "" });
  };

  useEffect(() => {
    if (auth?.accessToken) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="wave-container hero min-h-screen bg-base-200">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login Sekarang!</h1>
            <p className="py-6">
              Login untuk dapat memainkan permainan setak ini.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={onSubmit} onReset={onReset}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="username"
                    onChange={onHandleChange}
                    value={form.username}
                    placeholder="masukkan username disini"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    required
                    type="password"
                    id="password"
                    onChange={onHandleChange}
                    value={form.password}
                    placeholder="masukkan password disini"
                    className="input input-bordered"
                  />
                  <label className="label text-sm">
                    Sudah punya akun?
                    <span className="badge badge-outline py-4">
                      <Link
                        to="/register"
                        title="register"
                        className="text-sm px-2 py-2"
                      >
                        Register
                      </Link>
                    </span>
                  </label>
                </div>
                <div className="form-control my-2">
                  <button
                    type="submit"
                    className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                  >
                    Login
                  </button>
                </div>
                <div className="form-control my-2">
                  <button type="reset" className="btn btn-error">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
