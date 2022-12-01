import React from "react";
import { useState, useEffect } from "react";
import API_ENDPOINT from "../globals/api-endpoint";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import useAudio from "../hooks/useAudio";
import ReactHowler from "react-howler";
import menuAudio from "../globals/audios/menu-game.mp3";
import { showFormattedDate } from "../utils/formattedDate";

const Dashboard = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();
  const { audio, setAudio } = useAudio();

  const [username, setUsername] = useState(null);
  const [score, setScore] = useState(null);
  const [created, setCreated] = useState(null);

  useEffect(() => {
    syncMe();
  }, []);

  const syncMe = async () => {
    try {
      const response = await axiosPrivate.get(API_ENDPOINT.PROFILE_GET);
      const { username, score, createdAt } = response?.data?.data;
      setUsername(username);
      setScore(score);
      setCreated(createdAt);
      return response?.data?.data;
    } catch (error) {
      if (error.status === 403) return navigate("/login");
    }
  };

  return (
    <>
      <ReactHowler src={menuAudio} playing={Boolean(audio)} loop={true} />
      <div className="my-2 flex w-screen">
        <div className="stats mx-auto stats-vertical sm:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">Pengaturan Suara</div>
            <div className="stat-value text-primary">
              <span className="stat-value">Suara</span>
              <label className="swap ml-4">
                <input
                  type="checkbox"
                  onChange={(e) => setAudio(e.currentTarget.checked)}
                  checked={Boolean(audio)}
                />
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                </svg>
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
                </svg>
              </label>
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Skor tertinggi</div>
            <div className="stat-value text-secondary">{score}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img
                    src={`https://eu.ui-avatars.com/api/?name=${
                      auth?.username ? auth.username : "user"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="stat-title">Profile</div>
            <div className="stat-value text-primary">{username}</div>
            <div className="stat-desc">
              Bergabung pada {showFormattedDate(created)}
            </div>
          </div>
        </div>
      </div>
      <div className="wave-fontainer">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </>
  );
};

export default Dashboard;
