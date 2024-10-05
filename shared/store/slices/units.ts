import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getUnit = createAsyncThunk('unit/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT);
	return response?.data;
});

export const addUnit = createAsyncThunk('unit/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT, data);
	return response?.data;
});
export const deleteUnit = createAsyncThunk('unit/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT, data?.ID);
	return data;
});

export const updateUnit = createAsyncThunk('unit/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT + '/' + data?.ID, { ...data, ID: undefined });
	return response?.data;
});

export const getOneUnit = createAsyncThunk('unit/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT + "/" + data?.ID);
	return response?.data;
});

export const unitReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addUnit.pending, state => {
			state.pending = true;
		})
		.addCase(addUnit.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addUnit.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getUnit.pending, state => {
			state.pending = true;
		})
		.addCase(getUnit.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getUnit.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneUnit.pending, state => {
			state.pending = true;
		})
		.addCase(getOneUnit.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneUnit.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteUnit.pending, state => {
			state.pending = true;
		})
		.addCase(deleteUnit.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteUnit.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateUnit.pending, state => {
			state.pending = true;
		})
		.addCase(updateUnit.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateUnit.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default unitReducer;


