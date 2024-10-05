import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants";
import generalService from "../../services/generalServices";
import { objectArrayAPIInitialState } from "../types";





export const getTemaplatesByType = createAsyncThunk('template/getByType', async (data: any) => {
	const response: any = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TEMPLATES_GET + "/" + data?.id);
	return response?.templates;
});

export const getAllTemaplate = createAsyncThunk('template/getall', async () => {
	const response :any = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TEMPLATES_GET);
	return response?.data;
});


export const addTemaplate = createAsyncThunk('template/add', async (data: any) => {
	const response = await generalService.addGeneralMultiPart(reduxConstants.MAIN_API_URL + reduxConstants.TEMPLATES_GET, data);
	return response;
});
export const deleteTemaplate = createAsyncThunk('template/delete', async (data: any) => {
	const response: any = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TEMPLATES_GET, data?.id);
	return response?.templates;
});

export const updateTemaplate = createAsyncThunk('template/update', async (data: any) => {
	const response: any = await generalService.addGeneralMultiPart(reduxConstants.MAIN_API_URL + reduxConstants.TEMPLATES_GET + '/' + data.get("id"), data);
	return response?.templates;
});




export const templateReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addTemaplate.pending, state => {
			state.pending = true;
		})
		.addCase(addTemaplate.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addTemaplate.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getTemaplatesByType.pending, state => {
			state.pending = true;
		})
		.addCase(getTemaplatesByType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getTemaplatesByType.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getAllTemaplate.pending, state => {
			state.pending = true;
		})
		.addCase(getAllTemaplate.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getAllTemaplate.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(deleteTemaplate.pending, state => {
			state.pending = true;
		})
		.addCase(deleteTemaplate.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneTemaplate: any) => oneTemaplate.id != payload.id);
		})
		.addCase(deleteTemaplate.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateTemaplate.pending, state => {
			state.pending = true;
		})
		.addCase(updateTemaplate.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneTemaplate: any) => oneTemaplate.id == payload.id ? payload : oneTemaplate);
		})
		.addCase(updateTemaplate.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default templateReducer;

