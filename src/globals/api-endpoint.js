import CONFIG from "./config.js";

const API_ENDPOINT = {
  QUIZ_GET: `${CONFIG.BASE_URL}/quiz`,
  LOGIN_POST: `${CONFIG.BASE_URL}/login`,
  REGISTER_POST: `${CONFIG.BASE_URL}/register`,
  LOGOUT_DELETE: `${CONFIG.BASE_URL}/logout`,
  REFRESH_TOKEN_GET: `${CONFIG.BASE_URL}/tokens`,
  PROFILE_GET: `${CONFIG.BASE_URL}/me`,
  CHECKUSER_GET: (id) => `${CONFIG.BASE_URL}/check-user/${id}`,
  NEWSCORE_PATCH: (id) => `${CONFIG.BASE_URL}/add-score/${id}`,
}

export default API_ENDPOINT;