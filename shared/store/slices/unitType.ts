import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getUnitType = createAsyncThunk('unitType/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT_TYPE);
	return response?.data;
});

export const addUnitType = createAsyncThunk('unitType/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT_TYPE, data);
	return response?.data;
});
export const deleteUnitType = createAsyncThunk('unitType/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT_TYPE, data?.ID);
	return data;
});

export const updateUnitType = createAsyncThunk('unitType/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT_TYPE + '/' + data?.ID, { ...data,ID:undefined });
	return response?.data;
});

export const getOneUnitType = createAsyncThunk('unitType/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT_TYPE + "/" + data);
	return response?.data;
});

export const unitTypeReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addUnitType.pending, state => {
			state.pending = true;
		})
		.addCase(addUnitType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addUnitType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getUnitType.pending, state => {
			state.pending = true;
		})
		.addCase(getUnitType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getUnitType.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneUnitType.pending, state => {
			state.pending = true;
		})
		.addCase(getOneUnitType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneUnitType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteUnitType.pending, state => {
			state.pending = true;
		})
		.addCase(deleteUnitType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteUnitType.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateUnitType.pending, state => {
			state.pending = true;
		})
		.addCase(updateUnitType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateUnitType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default unitTypeReducer;
