import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CommentsInterface {
  comments: PostComment[];
}

const initialState: CommentsInterface = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<PostComment>) => {
      state.comments.push(action.payload);
    },
  },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
