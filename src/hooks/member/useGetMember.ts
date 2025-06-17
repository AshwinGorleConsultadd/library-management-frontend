import { useAppDispatch, useAppSelector } from "@/hooks";
import { memberActions } from "@/redux/sclices/memberSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMembersService } from "@/redux/services/memberService";

const useGetMembers = () => {
  const [loading, setLoading] = useState(false);
  const { status, data, error } = useAppSelector(
    (state) => state.member.getMembers
  );
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    }else {
      setLoading(false);
    }
  }, [dispatch, status]);

  useEffect(()=>{
     dispatch(getMembersService())
  },[])

  return {data, loading}
};

export default useGetMembers