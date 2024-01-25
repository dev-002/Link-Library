import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      try {
        // Attempt to refresh the token
        const refreshTokenResponse = await instance.post(
          "/api/refresh-token-endpoint"
        );

        //   const cookieValue = encodeURIComponent(value)
        //   document.cookie = "auth_token" + '=' + cookieValue ;

        const newToken = refreshTokenResponse.data.token;

        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return instance(error.config);
      } catch (refreshError) {
        // If token refresh fails, handle it accordingly
        console.error("Token refresh failed:", refreshError);
        window.location.href = "http://localhost:5173/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
