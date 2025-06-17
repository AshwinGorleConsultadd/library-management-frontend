import { useAppDispatch, useAppSelector } from "@/hooks";
import { bookActions } from "@/redux/sclices/bookSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createBookService } from "@/redux/services/bookService";

const useCreateBook = () => {
  const [loading, setLoading] = useState(false);
  const { status, data, error } = useAppSelector(
    (state) => state.book.createBook
  );
  const dispatch = useAppDispatch();

  const handleCreateBook = (data: {
    title: string,
    isbn: string,
    author: string,
    total_copies: number,
    borrowed_copies : number
  }) => {
    dispatch(createBookService(data))
  };

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [dispatch, status]);

  return {data, loading, handleCreateBook}
};

export default useCreateBook