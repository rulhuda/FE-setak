import { useContext } from "react";
import isPlayingContext from "../contexts/IsPlaying";

const useIsPlayingContext = () => {
  return useContext(isPlayingContext);
};

export default useIsPlayingContext;
