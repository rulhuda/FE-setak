import React from "react";
import { Link } from "react-router-dom";

const Guide = () => {
  return (
    <main>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="w-5/6 lg:w-4/5 mx-auto">
        <h2 className="font-bold text-2xl text-center py-4">Panduan</h2>
        <div className="collapse border border-accent rounded">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            Bagaimana cara mendaftar akun di setak?
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            <p>
              Cukup daftar dengan mengisi username dan password di link berikut{" "}
              <span>
                <Link
                  to="/register"
                  title="Daftar"
                  className="font-bold underline"
                >
                  Daftar
                </Link>
              </span>
            </p>
          </div>
        </div>
        <div className="collapse border border-accent rounded">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            Bagaimana cara login akun di setak?
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            <p>
              Cukup login dengan mengisi username dan password di link berikut{" "}
              <span>
                <Link to="/login" title="Login" className="font-bold underline">
                  Login
                </Link>
              </span>
            </p>
          </div>
        </div>
        <div className="collapse border border-accent rounded">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            Bagaimana cara memainkan setak?
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            <p>
              Ketika memainkan permainan setak - kata. Anda akan diberi sebuah
              petunjuk dan anda diharapkan dapat menebak tebakan dengan benar
              dengan keyboard yang disediakan
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Guide;
