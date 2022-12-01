import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosPrivate from "../api/axios";
import API_ENDPOINT from "../globals/api-endpoint";
import useAudio from "../hooks/useAudio";
import useAuth from "../hooks/useAuth";
import useIsPlayingContext from "../hooks/useIsPlaying";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const { theme, listTheme, setTheme } = useTheme();
  const { setAudio } = useAudio();
  const { isPlaying, setIsPlaying } = useIsPlayingContext();

  const navigate = useNavigate();

  const onLogout = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Yakin ingin logout?",
      showCancelButton: true,
      icon: "warning",
    }).then(async (isConfirm) => {
      if (isConfirm.isConfirmed) {
        const response = await axiosPrivate.delete(API_ENDPOINT.LOGOUT_DELETE);

        if (response.status !== 200) {
          return Swal.fire("Logout gagal!", "", "error");
        }
        return Swal.fire("Logout berhasil!", "", "success").then(() => {
          setAuth({});
          setAudio(false);
          navigate("/login");
        });
      }
    });
  };

  const onLeaveGame = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Yakin ingin mengakhir game?",
      showCancelButton: true,
      text: "Note: Score yang anda mainkan saat ini tidak akan disimpan.",
      icon: "warning",
    }).then(async (isConfirm) => {
      if (isConfirm.isConfirmed) {
        return Swal.fire("Mengakhiri permainan berhasil!", "", "success").then(
          () => {
            setIsPlaying(false);
            navigate("/dashboard");
          }
        );
      }
    });
  };

  const onHandleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setTheme(value);
  };

  const onNavigateDashboard = (e) => {
    e.preventDefault();
    if (auth?.accessToken) {
      navigate("/dashboard");
    }
  };

  const menu = [
    {
      href: "/play",
      text: "Play",
      className: "bg-light",
      textClass: "text-dark",
    },
    {
      href: "/guide",
      text: "Panduan",
      className: "bg-light",
      textClass: "text-dark",
    },
  ];

  const linkTokenTrue = () => {
    if (isPlaying === false && auth?.accessToken) {
      const newMenu = menu.map((item) => {
        return (
          <li className={item.className} key={item.text}>
            <Link className={item.textClass} to={item.href}>
              {item.text}
            </Link>
          </li>
        );
      });

      return (
        <>
          {newMenu}
          <li className="bg-secondary">
            <a className="text-dark font-bold" onClick={onLogout}>
              Logout
            </a>
          </li>
        </>
      );
    }

    if (isPlaying === false && !auth?.accessToken) {
      return (
        <>
          <li className="bg-light">
            <Link className="text-dark font-bold" to="/login">
              Login
            </Link>
          </li>
          <li className="bg-light">
            <Link className="text-dark font-bold" to="/register">
              Register
            </Link>
          </li>
        </>
      );
    }

    return (
      <li className="bg-secondary">
        <a className="text-dark font-bold" onClick={onLeaveGame}>
          Akhiri pemainan
        </a>
      </li>
    );
  };

  return (
    <>
      <div className="navbar sticky top-0 z-50 bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              title="Menu"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {linkTokenTrue()}
              <div className="flex flex-row w-full">
                <select
                  onChange={onHandleChange}
                  data-tip="Select Theme"
                  className="select my-2 uppercase select-ghost select-bordered select-sm w-full max-w-xs"
                >
                  {theme ? (
                    <option key={theme} defaultValue={theme}>
                      Theme: {theme}
                    </option>
                  ) : (
                    ""
                  )}
                  {listTheme.map((item) => {
                    if (item === theme) {
                      return;
                    }
                    return (
                      <option key={item} defaultValue={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link
            to={isPlaying ? "#" : "/"}
            title={isPlaying ? "Homepage terkunci" : "Homepage"}
            className="btn btn-ghost normal-case text-xl"
          >
            Setak
          </Link>
        </div>
        <div className="navbar-end">
          <button
            disabled={isPlaying ? true : false}
            title={isPlaying ? "Dashboard terkunci" : "Dashboard"}
            onClick={onNavigateDashboard}
            className="btn btn-ghost btn-circle"
          >
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    auth?.username
                      ? `https://eu.ui-avatars.com/api/?name=${auth?.username}`
                      : `https://eu.ui-avatars.com/api/?name=x`
                  }
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
