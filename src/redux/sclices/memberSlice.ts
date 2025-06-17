import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "member",
  initialState: {
    createMember: {
      status: "idle",
      data: null,
      error: null,
    },
    getMembers: {
      status: "idle",
      data: null,
      error: null,
    },
    updateMember: {
      status: "idle",
      data: null,
      error: null,
    },
    deleteMember: {
      status: "idle",
      success: false,
      error: null,
    },
  },
  reducers: {
    // CREATE
    createMemberRequest: (state) => {
      state.createMember.status = "pending";
      state.createMember.data = null;
      state.createMember.error = null;
    },
    createMemberSuccess: (state, action) => {
      state.createMember.status = "success";
      state.createMember.data = action.payload;
      state.getMembers.data = [...(state.getMembers.data || []), action.payload];
    },
    createMemberError: (state, action) => {
      state.createMember.status = "failed";
      state.createMember.error = action.payload;
    },
    clearCreateMember: (state) => {
      state.createMember.status = "idle";
      state.createMember.data = null;
      state.createMember.error = null;
    },

    // READ
    getMembersRequest: (state) => {
      state.getMembers.status = "pending";
      state.getMembers.data = null;
      state.getMembers.error = null;
    },
    getMembersSuccess: (state, action) => {
      state.getMembers.status = "success";
      state.getMembers.data = action.payload;
    },
    getMembersError: (state, action) => {
      state.getMembers.status = "failed";
      state.getMembers.error = action.payload;
    },
    clearGetMembers: (state) => {
      state.getMembers.status = "idle";
      state.getMembers.data = null;
      state.getMembers.error = null;
    },

    // UPDATE
    updateMemberRequest: (state) => {
      state.updateMember.status = "pending";
      state.updateMember.error = null;
    },
    updateMemberSuccess: (state, action) => {
      state.updateMember.status = "success";
      state.updateMember.data = action.payload;
      state.getMembers.data = state.getMembers.data.map((member: any) =>
        member.id === action.payload.id ? action.payload : member
      );
    },
    updateMemberError: (state, action) => {
      state.updateMember.status = "failed";
      state.updateMember.error = action.payload;
    },

    // DELETE
    deleteMemberRequest: (state) => {
      state.deleteMember.status = "pending";
      state.deleteMember.success = false;
      state.deleteMember.error = null;
    },
    deleteMemberSuccess: (state, action) => {
      state.deleteMember.status = "success";
      state.deleteMember.success = true;
      const deletedId = action.payload;
      state.getMembers.data = state.getMembers.data.filter(
        (member: any) => member.id !== deletedId
      );
    },
    deleteMemberError: (state, action) => {
      state.deleteMember.status = "failed";
      state.deleteMember.error = action.payload;
    },
    clearDeleteMember: (state) => {
      state.deleteMember.status = "idle";
      state.deleteMember.success = false;
      state.deleteMember.error = null;
    },
  },
});

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;
