import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateMemberService } from "@/redux/services/memberService";

const useUpdateMember = () => {
  const [loading, setLoading] = useState(false);
  const { status, data, error } = useAppSelector(
    (state) => state.member.updateMember
  );
  const dispatch = useAppDispatch();

  const handleUpdateMember = (data: {
    id: number;
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    image?: string;
  }) => {
    dispatch(updateMemberService(data));
  };

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  return {
    data,
    error,
    loading,
    handleUpdateMember,
  };
};

export default useUpdateMember;
