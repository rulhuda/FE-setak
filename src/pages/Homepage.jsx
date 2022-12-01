import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <div className="wave-container hero min-h-screen">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Selamat datang di Setak - Kata!
            </h1>
            <p className="mb-5">
              Setak - Kata (Senam Otak dengan Kata) adalah permainan teka-teki
              yang dibuat untuk menyegarkan otak dengan tebakan yang unik.
              Segera mainkan Setak - Kata sekarang juga!
            </p>
            <Link className="btn btn-primary mx-1" to="/login">
              Mulai
            </Link>
            <Link
              className="btn btn-ghost btn-active border border-primary mx-1"
              to="/guide"
            >
              Panduan
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
