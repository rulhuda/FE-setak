import { useContext } from "react";
import ThemeContext from "../contexts/Theme";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
