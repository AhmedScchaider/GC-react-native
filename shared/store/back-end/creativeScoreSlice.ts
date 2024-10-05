import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants";
import generalService from "../../services/generalServices";
import { objectArrayAPIInitialState } from "../types";




export const clearCreativeScore = createAsyncThunk('creativeScore/clear', async () => {
	return {};
});


export const getLocalCreativeScore = createAsyncThunk('getLocalCreativeScore/get', async (data: any) => {
	return data;
});

export const getCreativeScore = createAsyncThunk('creativeScore/get', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.GET_SCORE + "/" + data?.Id);
	return response;
});




export const creativeScoreReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(clearCreativeScore.pending, state => {
			state.pending = true;
		})
		.addCase(clearCreativeScore.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = payload;
		})
		.addCase(clearCreativeScore.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getLocalCreativeScore.pending, state => {
			state.pending = true;
		})
		.addCase(getLocalCreativeScore.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = payload;
		})
		.addCase(getLocalCreativeScore.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getCreativeScore.pending, state => {
			state.pending = true;
		})
		.addCase(getCreativeScore.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = payload;
		})
		.addCase(getCreativeScore.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default creativeScoreReducer;

