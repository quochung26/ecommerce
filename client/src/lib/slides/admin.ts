import { createSlice } from "@reduxjs/toolkit";

export interface AdminState {
  sidebar: {
    isOpen: boolean
  };
}

const initialState: AdminState = {
  sidebar: {
    isOpen: false
  },
};

const adminSidebarSlide = createSlice({
  name: "admin",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebar = { ...state.sidebar, isOpen: action.payload }
    }
  },
});

const { actions, reducer } = adminSidebarSlide;

export default reducer;

export const { toggleSidebar } = actions;
