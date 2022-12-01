import { useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../contexts/Auth";
import API_ENDPOINT from "../globals/api-endpoint";
import jwt_decode from "jwt-decode";

const refreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const response = await axios.get(API_ENDPOINT.REFRESH_TOKEN_GET);
      const { accessToken } = await response?.data;
      const decoded = jwt_decode(accessToken);
      const { id, username, iat, exp } = decoded || null;
      setAuth(prev => {
        return { ...prev, id, username, iat, exp, accessToken }
      });
      return {
        id, username, iat, exp, accessToken
      };
    } catch (error) {
      if (!error?.response) {
        console.log(error);
      }
      if (error.response) {
        navigate("/login");
      }
    }
  };
  return refresh;
}

export default refreshToken;