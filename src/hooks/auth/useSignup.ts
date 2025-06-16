import { useAppDispatch, useAppSelector } from "@/hooks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signupService } from "@/redux/services/authService";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const dispatch = useAppDispatch();
  const { status, data, error } = useAppSelector((state) => state.auth.signup);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignup = (data: { name: string, email : string, password: string, confirm_password : string }) => {
    console.log("handle signup called : ", data)
    dispatch(signupService(data));
  };

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    }else if(status == 'success'){
        setLoading(false);
        console.log("signup success in useEffect")
        navigate("/verify-email")
    } else {
      setLoading(false);
    }
  }, [status, dispatch]);

  return { data, loading, handleSignup };
};

export default useSignup