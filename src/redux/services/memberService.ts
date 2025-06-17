import axiosClient from "@/lib/exios";
import { memberActions } from "../sclices/memberSlice";
import { toast } from "react-toastify";

// CREATE MEMBER
export const createMemberService = (data: {
  name: string;
  email: string;
  username: string;
  password: string;
  image?: string;
}) => {
  return async (dispatch: any) => {
    try {
      console.log("create-member-request:", data);
      dispatch(memberActions.createMemberRequest());
      const response = await axiosClient.post("/members", data);
      console.log("create-member-response:", response);
      dispatch(memberActions.createMemberSuccess(response.data));
      toast.success(`Member "${response.data.name}" created successfully!`);
    } catch (error: any) {
      console.log("create-member-error:", error);
      dispatch(memberActions.createMemberError(error));
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while creating member!"
      );
    }
  };
};

// GET ALL MEMBERS
export const getMembersService = () => {
  return async (dispatch: any) => {
    try {
      console.log("get-members-request");
      dispatch(memberActions.getMembersRequest());
      const response = await axiosClient.get("/members");
      console.log("get-members-response:", response);
      dispatch(memberActions.getMembersSuccess(response.data));
      // toast.success("Members fetched successfully!");
    } catch (error: any) {
      console.log("get-members-error:", error);
      dispatch(memberActions.getMembersError(error));
      toast.error(
        error?.response?.data?.message || "Failed to fetch members!"
      );
    }
  };
};

// UPDATE MEMBER
export const updateMemberService = (data: {
  id: number;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  image?: string;
}) => {
  return async (dispatch: any) => {
    try {
      console.log("update-member-request:", data);
      dispatch(memberActions.updateMemberRequest());
      const { id, ...body } = data;
      const response = await axiosClient.put(`/members/${id}`, body);
      console.log("update-member-response:", response);
      dispatch(memberActions.updateMemberSuccess(response.data));
      toast.success(`Member "${response.data.name}" updated successfully!`);
    } catch (error: any) {
      console.log("update-member-error:", error);
      dispatch(memberActions.updateMemberError(error));
      toast.error(
        error?.response?.data?.detail || "Failed to update member!"
      );
    }
  };
};

// DELETE MEMBER
export const deleteMemberService = (id: number) => {
  return async (dispatch: any) => {
    try {
      console.log("delete-member-request:", id);
      dispatch(memberActions.deleteMemberRequest());
      await axiosClient.delete(`/members/${id}`);
      dispatch(memberActions.deleteMemberSuccess(id));
      toast.success("Member deleted successfully!");
    } catch (error: any) {
      console.log("delete-member-error:", error);
      dispatch(memberActions.deleteMemberError(error));
      toast.error(
        error?.response?.data?.message || "Failed to delete member!"
      );
    }
  };
};
