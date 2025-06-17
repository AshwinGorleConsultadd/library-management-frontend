import axiosClient from "@/lib/exios";
import { bookActions } from "../sclices/bookSlice";
import { toast } from "react-toastify";

export const createBookService = (data: {
  title: string,
  isbn: string,
  total_copies: number,
  borrowed_copies : number,
  author: string
}) => {
  return async (dispath: any) => {
    try {
      console.log("create-book-request :", data);
      dispath(bookActions.createBookRequest())
      const response = await axiosClient.post("/books", data)
      console.log("create-book-response :", response);
      dispath(bookActions.createBookSuccess(response.data))
      toast(`Book ${response?.data?.title} created sucessfully!`)
    } catch (error) {
      console.log("create-book-error :", error);
      dispath(bookActions.createBookError(error))
      toast(`${error?.response?.data?.message || "something went wrong while creating book!" }`)
    }
  };
};

export const getBooksService = () => {
  return async (dispath: any) => {
    try {
      console.log("get-books-request :");
      dispath(bookActions.getBooksRequest())
      const response = await axiosClient.get("/books")
      console.log("get-books-response :", response);
      dispath(bookActions.getBooksSuccess(response.data))
      
    } catch (error) {
      console.log("get-books-error :", error);
      dispath(bookActions.getBooksError(error))
      toast(`${error?.response?.data?.message || "something went wrong while geting book!" }`)
    }
  };
};

export const updateBookService = (data: {
  id: number;
  title: string;
  isbn: string;
  total_copies: number;
  borrowed_copies: number;
  author: string;
}) => {
  return async (dispatch: any) => {
    try {
      console.log('update-book-request',data)
      dispatch(bookActions.updateBookRequest());
      const { id, ...body } = data;  // remove id from payload
      const response = await axiosClient.put(`/books/${id}`, body);
      dispatch(bookActions.updateBookSuccess(response.data));
      console.log('update-book-response',response)
      toast.success(`Book "${response.data.title}" updated successfully!`);
    } catch (error: any) {
      console.log('update-book-error',error)
      dispatch(bookActions.updateBookError(error));
      toast.error(
        error?.response?.data?.detail || "Failed to update book!"
      );
    }
  };
};




export const deleteBookService = (id: number) => {
  return async (dispatch: any) => {
    try {
      console.log("delete-book-request:", id);
      dispatch(bookActions.deleteBookRequest());

      await axiosClient.delete(`/books/${id}`);

      dispatch(bookActions.deleteBookSuccess(id));
      
    } catch (error: any) {
      console.error("delete-book-error:", error);
      dispatch(bookActions.deleteBookError(error));
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while deleting the book!"
      );
    }
  };
};
