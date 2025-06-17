// hooks/useReturnBook.ts
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { returnBookService } from "@/redux/services/issueReturnService";
import { useEffect, useState } from "react";

export const useReturnBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, data } = useSelector((state: RootState) => state.issueReturn.returnBook);
  const [loading, setLoading]  = useState(false);
  const handleReturnBook = (data: { user_id: number; book_id: number }) => {
    dispatch(returnBookService(data));
  };

  useEffect(()=>{
      if(status == 'pending'){
        setLoading(true)
      }else{
        setLoading(false)
      }
    },[dispatch, status])
  
  return {
    data,
    status,
    error,
    handleReturnBook,
    loading
  };
};
