import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createMemberService } from "@/redux/services/memberService";

const useCreateMember = () => {
  const [loading, setLoading] = useState(false);
  const { status, data, error } = useAppSelector(
    (state) => state.member.createMember
  );
  const dispatch = useAppDispatch();

  const handleCreateMember = (data: {
    name: string;
    email: string;
    username: string;
    password: string;
    image?: string;
  }) => {
    dispatch(createMemberService(data));
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
    handleCreateMember,
  };
};

export default useCreateMember;
