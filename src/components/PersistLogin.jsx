import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { ThreeCircles } from "react-loader-spinner";

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const verifyRefreshToken = async () => {
    try {
      await refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!auth?.accessToken) {
      verifyRefreshToken();
      setTimeout(() => {
        setIsLoading(false);
      }, 2100);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {}, [isLoading]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex mx-auto text-center">
            <ThreeCircles
              width="6rem"
              height="6rem"
              color="#4f4f4f"
              wrapperStyle={{ margin: "0 auto", marginTop: "6rem" }}
            />
          </div>
          <div className="w-full my-2 text-center">
            <h2 className="font-bold text-2xl text-slate-700 mx-auto">
              Loading ...
            </h2>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
