import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateBookService } from "@/redux/services/bookService";
import { useEffect, useState } from "react";

const useUpdateBook = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.book.updateBook);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(status === "pending");
  }, [status]);

  const handleUpdateBook = (bookData: {
    id: number;
    title: string;
    isbn: string;
    total_copies: number;
    borrowed_copies: number;
    author: string;
  }) => {
    console.log("dispatching updateBookService action ")
    dispatch(updateBookService(bookData));
  };

  return { handleUpdateBook, loading, error };
};

export default useUpdateBook;
