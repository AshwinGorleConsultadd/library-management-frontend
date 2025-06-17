import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteBookService } from "@/redux/services/bookService";

const useDeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { status, data, error } = useAppSelector(
    (state) => state.book.deleteBook
  );
  const dispatch = useAppDispatch();

  const handleDeleteBook = (id: number) => {
    dispatch(deleteBookService(id));
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
    handleDeleteBook,
  };
};

export default useDeleteBook;
