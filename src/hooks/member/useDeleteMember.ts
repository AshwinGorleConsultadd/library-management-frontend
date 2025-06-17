import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteMemberService } from "@/redux/services/memberService";

const useDeleteMember = () => {
  const [loading, setLoading] = useState(false);
  const { status, error } = useAppSelector(
    (state) => state.member.deleteMember
  );
  const dispatch = useAppDispatch();

  const handleDeleteMember = (id: number) => {
    dispatch(deleteMemberService(id));
  };

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  return {
    error,
    loading,
    handleDeleteMember,
  };
};

export default useDeleteMember;
