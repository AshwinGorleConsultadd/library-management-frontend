import { useAppDispatch, useAppSelector } from "@/hooks";
import { bookActions } from "@/redux/sclices/bookSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBooksService } from "@/redux/services/bookService";

const useGetBooks = () => {
  const [loading, setLoading] = useState(false);
  const { status, data, error } = useAppSelector(
    (state) => state.book.getBooks
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
     dispatch(getBooksService())
  },[])

  return {data, loading}
};

export default useGetBooks