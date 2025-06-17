// hooks/useIssueBook.ts
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { issueBookService } from "@/redux/services/issueReturnService";
import { useEffect, useState } from "react";

 const useIssueBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.issueReturn.issueBook);
  const [loading, setLoading] = useState(false);
  const handleIssueBook = (data: { user_id: number; book_id: number }) => {
    console.log("handle-issue-book :", data)
    dispatch(issueBookService(data));
  };

  useEffect(()=>{
    if(status == 'pending'){
      setLoading(true)
    }else{
      setLoading(false)
    }
  },[dispatch, status])
  
  return {
    status,
    error,
    handleIssueBook,
    loading

  };
};

export default useIssueBook;