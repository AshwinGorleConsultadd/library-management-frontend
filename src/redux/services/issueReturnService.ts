// features/issueReturn/issueReturnService.ts
import axiosClient from "@/lib/exios";
import { AppDispatch } from "../store";
import { issueReturActions } from "../sclices/issueReturnSlice";
import { toast } from "react-toastify";

export const issueBookService = (data: { user_id: number; book_id: number }) => async (dispatch: AppDispatch) => {
  try {
    console.log("issue-book-request :", data)
    dispatch(issueReturActions.issueBookRequest());
    const response = await axiosClient.post("/issue", data);
    console.log("issue-book-response :", response)
    dispatch(issueReturActions.issueBookSuccess());
    toast("book alloted sucessfully!")
} catch (error: any) {
     console.log("issue-book-error :", error)
    dispatch(issueReturActions.issueBookFailure(error.response?.data?.detail || error.message));
  }
};

export const returnBookService = (id : number) => async (dispatch: AppDispatch) => {
  try {
    console.log("return-book-request :", id)
    dispatch(issueReturActions.returnBookRequest());
    const response = await axiosClient.put(`/issue/return/${id}`);
    console.log("return-book-sucess :", response)
    dispatch(issueReturActions.returnBookSuccess(response?.data));
  } catch (error: any) {
    console.log("return-book-error :", error)
    dispatch(issueReturActions.returnBookFailure(error.response?.data?.detail || error.message));
  }
};

export const getIssuedBooks = () => async (dispatch: AppDispatch) => {
  try {
    console.log("Dispatching getIssuedBooksRequest...")
    dispatch(issueReturActions.getIssuedBooksRequest())
    const response = await axiosClient.get("/issue/")
    console.log("Issued books fetched successfully:", response.data)

    dispatch(issueReturActions.getIssuedBooksSuccess(response.data))
  } catch (error: any) {
    console.error("Error fetching issued books:", error)
    dispatch(issueReturActions.getIssuedBooksFailure(error.message || "Something went wrong"))
  }
}