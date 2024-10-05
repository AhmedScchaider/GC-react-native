import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { creativeFormPrompt, reduxConstants } from "../../constants";
import generalService from "../../services/generalServices";
import { objectArrayAPIInitialState } from "../types";


export const setCreativeResult = createAsyncThunk('creativeResult/setArray', async (data: any) => {
	return data;
});

export const getOneCreativeResult = createAsyncThunk('creativeResult/get', async (data: any) => {
	localStorage.setItem("ONE_CREATIVE_RESULT", JSON.stringify(data));
	return data;
});

export const updateTextCreativeResult = createAsyncThunk('updateTextCreativeResult/add', async (data: any) => {
	const response = await generalService.addGeneral(`${reduxConstants.MAIN_API_URL}${reduxConstants.ADD_EDIT_PROMPT_01}${creativeFormPrompt.TEXT}${reduxConstants.EDIT_PROMPT_02}${data?.Id}`, data?.prompt);
	return response;
});

export const updateImageCreativeResult = createAsyncThunk('updateImageCreativeResult/add', async (data: any) => {
	const response = await generalService.addGeneral(`${reduxConstants.MAIN_API_URL}${reduxConstants.ADD_EDIT_PROMPT_01}${creativeFormPrompt.MEDIA}${reduxConstants.EDIT_PROMPT_02}${data?.Id}`, data?.prompt);
	return response;
});

export const addCreativeResult = createAsyncThunk('creativeResult/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.POST_CREATIVE_TEXT_IMAGE, data);
	return response;
});




export const creativeResultReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(setCreativeResult.pending, state => {
			state.pending = true;
		})
		.addCase(setCreativeResult.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(setCreativeResult.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(addCreativeResult.pending, state => {
			state.pending = true;
		})
		.addCase(addCreativeResult.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [payload, ...state.data];
		})
		.addCase(addCreativeResult.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(updateImageCreativeResult.pending, state => {
			state.pending = true;
		})
		.addCase(updateImageCreativeResult.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = payload;
		})
		.addCase(updateImageCreativeResult.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(updateTextCreativeResult.pending, state => {
			state.pending = true;
		})
		.addCase(updateTextCreativeResult.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = payload;
		})
		.addCase(updateTextCreativeResult.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneCreativeResult.pending, state => {
			state.pending = true;
		})
		.addCase(getOneCreativeResult.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = payload;
		})
		.addCase(getOneCreativeResult.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default creativeResultReducer;

