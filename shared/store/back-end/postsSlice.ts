import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants";
import generalService from "../../services/generalServices";
import { objectArrayAPIInitialState } from "../types";



export const getPosts = createAsyncThunk('post/get', async (userData: string) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.GET_POSTS + userData);
	return response?.data as any[];
});


export const addPosts = createAsyncThunk('post/add', async (data: any) => {
	const response = await generalService.addGeneralMultiPart(reduxConstants.MAIN_API_URL + reduxConstants.GET_POSTS, data);
	return response;
});





export const postReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addPosts.pending, state => {
			state.pending = true;
		})
		.addCase(addPosts.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addPosts.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getPosts.pending, state => {
			state.pending = true;
		})
		.addCase(getPosts.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getPosts.rejected, state => {
			state.pending = false;
			state.error = true;
		})

});

export default postReducer;

