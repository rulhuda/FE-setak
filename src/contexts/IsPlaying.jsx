import { createContext, useState } from "react";

const isPlayingContext = createContext();

export const PlayingProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <isPlayingContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </isPlayingContext.Provider>
  );
};

export default isPlayingContext;
