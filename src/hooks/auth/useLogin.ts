import { useAppDispatch, useAppSelector } from "@/hooks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginService } from "@/redux/services/authService";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const { status, data, error } = useAppSelector((state) => state.auth.login);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (data: { username: string; password: string }) => {
    console.log("handle login called : ", data)
    dispatch(loginService(data));
  };

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    }else if(status == 'success'){
        setLoading(false);
        navigate("/home")
    } else {
      setLoading(false);
    }
  }, [status, dispatch]);

  return { data, loading, handleLogin };
};

export default useLogin