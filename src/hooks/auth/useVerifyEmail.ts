import { useAppDispatch, useAppSelector } from "@/hooks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { verifyEmailService } from "@/redux/services/authService";
import { useNavigate } from "react-router-dom";

const useHandleVerifyEmail = () => {
  const dispatch = useAppDispatch();
  const { status, data, error } = useAppSelector((state) => state.auth.verifyEmail);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleVerifyEmail = (data: { email: string, otp : string}) => {
    console.log("handle verify-email called : ", data)
    dispatch(verifyEmailService(data));
  };

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    }else if(status == 'success'){
        setLoading(false);
        navigate("/login")
    } else {
      setLoading(false);
    }
  }, [status, dispatch]);

  return { data, loading, handleVerifyEmail };
};

export default useHandleVerifyEmail