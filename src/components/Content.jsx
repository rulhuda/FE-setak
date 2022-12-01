import React, { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import API_ENDPOINT from "../globals/api-endpoint";

const Content = () => {
  const { auth } = useAuth();

  const TIMER = 60;
  const interval = useRef();
  const [seconds, setSeconds] = useState(TIMER);
  const [incorrect, setIncorrect] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [data, setData] = useState([]);
  const [guess, setGuess] = useState([]);
  const [question, setQuestion] = useState([]);
  const [newScore, setNewScore] = useState(0);

  const fetcher = async () => {
    const response = await axios.get(API_ENDPOINT.QUIZ_GET);
    const responseData = await response.data;
    setData(responseData);
  };

  const handleKeypad = async (e) => {
    e.preventDefault();
    const { value } = e.target;
    e.target.disabled = true;
    const { answer } = question;
    setGuess((prev) => [...prev, value]);
    if (answer.includes(value)) {
      setCorrect((prev) => [...prev, value]);
      return;
    }
    setIncorrect((prev) => [...prev, value]);
  };

  const clearState = () => {
    setCorrect([]);
    setIncorrect([]);
    setGuess([]);
    setQuestion([]);
    if (!data) {
      fetcher();
      return;
    }
  };

  const guessWord = (question) => {
    if (!question) {
      return <h2>Loading...</h2>;
    }
    const { answer } = question;

    const result = answer
      ?.split("")
      .map((letter, index) => (
        <input
          key={index}
          readOnly
          type="text"
          value={guess.includes(letter) ? letter : "__"}
          className="h-11 sm:h-12 md:h-13 lg:h-14 xl:h-15 w-11 sm:w-12 md:w-13 lg:w-14 xl:w-15 read-only:text-2xl py-1 px-2 text-center mx-2 my-2 shadow-md read-only:rounded-lg read-only:font-bold read-only:uppercase read-only:text-indigo-500 read-only:bg-slate-100 focus:outline-none"
        />
      ));
    return result;
  };

  const generateKeypad = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <button
        key={letter}
        value={letter}
        onClick={handleKeypad}
        className="keypad rounded h-10 disabled:bg-slate-300 disabled:text-slate-500 mx-2 my-2 py-0 px-1 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-medium bg-indigo-600"
      >
        {letter.toUpperCase()}
      </button>
    ));
  };

  const startTimer = (value) => {
    clearInterval(interval.current);

    setSeconds(value);
    interval.current = setInterval(() => {
      value--;
      if (value === 0) {
        clearInterval(interval.current);
      }
      setSeconds(value);
    }, 1000);
  };

  const generateQuestion = (data) => {
    setQuestion(() => data[Math.floor(Math.random() * data.length)]);
  };

  useEffect(() => {
    fetcher();
    startTimer(TIMER);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      Swal.fire({
        title: `Waktu habis, score anda ${newScore}`,
        icon: "warning",
        timer: 2000,
      }).then(async () => {
        const response = await axios.patch(
          API_ENDPOINT.NEWSCORE_PATCH(auth?.id),
          {
            score: Number(newScore),
          }
        );
        console.log(response);
      });
    }
  }, [seconds]);

  useEffect(() => {
    generateQuestion(data);
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      if (incorrect.length >= 5) {
        Swal.fire("Sisa tebakan habis!", "", "warning").then(async () => {
          const response = await axios.patch(
            API_ENDPOINT.NEWSCORE_PATCH(auth?.id),
            {
              score: Number(newScore),
            }
          );
          console.log(response);
        });

        return;
      }
      if (question?.answer) {
        const thisAnswer = question.answer.split("");
        const toShortAnswer = [...new Set(thisAnswer)];
        if (toShortAnswer.length === correct.length) {
          Swal.fire({
            title: "Tebakan benar!",
            icon: "success",
            timer: 1500,
          }).then(() => {
            setNewScore((prev) => prev + 10);
            clearState();
            generateQuestion(data);
            const allKeypad = document.querySelectorAll(".keypad");
            for (let i = 0; i < allKeypad.length; i++) {
              const element = allKeypad[i];
              element.disabled = false;
            }
          });
        }
      }
    }, 200);
  }, [guess]);

  return (
    <>
      <main>
        <div className="mx-auto sm:w-full md:w-4/5 lg:w-3/5 max-w-7xl py-2 mb-9 sm:px-6 lg:px-8">
          <div className="h-full px-4 py-6 sm:px-0">
            <div className="w-full rounded-lg h-2/4 overflow-y-auto bg-slate-100">
              <div className="w-full h-auto bg-indigo-200 text-center rounded-t-lg font-bold">
                <div className="w-full py-2 text-2xl bg-indigo-600 text-slate-200 rounded-t-lg">
                  Tebak Kata
                </div>

                <div className="w-full py-1 text-xl border-t-2 bg-indigo-200 border-t-slate-400 text-slate-600">
                  Waktu : {seconds}
                </div>
              </div>
              <div className="w-full h-3/4 overflow-y-auto bg-slate-200 px-2 py-2">
                {!question && (
                  <div className="w-full grid grid-flow-row grid-cols-5 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9 place-content-stretch mx-2 my-2 justify-around">
                    <ThreeDots
                      width="1.9rem"
                      height="1.9rem"
                      color="#888"
                      ariaLabel="three-dots-loading"
                    />
                  </div>
                )}
                <div className="w-full grid grid-flow-row grid-cols-5 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9 place-content-stretch justify-around">
                  {question ? (
                    guessWord(question)
                  ) : (
                    <>
                      <input
                        readOnly
                        type="text"
                        value="__"
                        className="h-11 sm:h-12 md:h-13 lg:h-14 xl:h-15 w-11 sm:w-12 md:w-13 lg:w-14 xl:w-15 read-only:text-2xl py-1 px-2 text-center mx-2 my-2 shadow-md read-only:rounded-lg read-only:font-bold read-only:uppercase read-only:text-indigo-500 read-only:bg-slate-100 focus:outline-none"
                      />
                      <input
                        readOnly
                        type="text"
                        value="__"
                        className="h-11 sm:h-12 md:h-13 lg:h-14 xl:h-15 w-11 sm:w-12 md:w-13 lg:w-14 xl:w-15 read-only:text-2xl py-1 px-2 text-center mx-2 my-2 shadow-md read-only:rounded-lg read-only:font-bold read-only:uppercase read-only:text-indigo-500 read-only:bg-slate-100 focus:outline-none"
                      />
                      <input
                        readOnly
                        type="text"
                        value="__"
                        className="h-11 sm:h-12 md:h-13 lg:h-14 xl:h-15 w-11 sm:w-12 md:w-13 lg:w-14 xl:w-15 read-only:text-2xl py-1 px-2 text-center mx-2 my-2 shadow-md read-only:rounded-lg read-only:font-bold read-only:uppercase read-only:text-indigo-500 read-only:bg-slate-100 focus:outline-none"
                      />
                    </>
                  )}
                </div>
                <div className="w-full px-2 text-slate-600 font-medium uppercase">
                  {question ? (
                    question?.hint
                  ) : (
                    <>
                      Hints...
                      <ThreeDots
                        width="1.9rem"
                        height="1.9rem"
                        color="#888"
                        ariaLabel="three-dots-loading"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="w-full text-center text-xl font-bold text-slate-200 h-auto bg-indigo-200 grid grid-flow-row grid-cols-5 xs:grid-cols-6 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-9 xl:grid-cols-10 justify-around align-middle place-content-center">
                {generateKeypad()}
              </div>
              <div className="w-full text-center text-xl font-bold text-slate-200 h-auto bg-indigo-400 rounded-b-lg px-4 py-2">
                {question?.category?.name?.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Content;
