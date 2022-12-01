import { useContext } from "react";
import AudioContext from "../contexts/Audio";

const useAudio = () => {
  return useContext(AudioContext);
};

export default useAudio;
