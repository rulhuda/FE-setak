import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API_ENDPOINT from "../globals/api-endpoint";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";

  const [form, setForm] = useState({ username: "", password: "" });
  const [errMsg, setErrMsg] = useState("");

  const onHandleChange = async (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    setForm((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, password } = form;
      const postLogin = await axios.post(API_ENDPOINT.REGISTER_POST, {
        username,
        password,
      });

      if (postLogin.data.error !== false)
        return Swal.fire(
          "Register gagal!",
          "Username tidak tersedia. Harap pilih username yang lain!",
          "error"
        );
      Swal.fire("Register berhasil!", "", "success");
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

  return (
    <>
      <div className="wave-container hero min-h-screen bg-base-200">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Registrasi sekarang!</h1>
            <p className="py-6">
              Daftar akun untuk dapat memainkan game setak ini!
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
                        to="/login"
                        title="login"
                        className="text-sm px-2 py-2"
                      >
                        Login
                      </Link>
                    </span>
                  </label>
                </div>
                <div className="form-control my-2">
                  <button type="submit" className="btn btn-primary">
                    Register
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

export default Register;
