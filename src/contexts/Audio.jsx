import { createContext, useEffect, useState } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const getAudio = localStorage.getItem("audio") || false;
  const [audio, setAudio] = useState(getAudio);

  useEffect(() => {
    localStorage.setItem("audio", getAudio);
  }, []);

  useEffect(() => {
    localStorage.setItem("audio", audio);
  }, [audio]);

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
