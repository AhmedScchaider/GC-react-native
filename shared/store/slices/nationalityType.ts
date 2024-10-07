import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getNationalityType = createAsyncThunk('nationalityType/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.NATIONALITY_TYPE);
	return response?.data;
});

export const addNationalityType = createAsyncThunk('nationalityType/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.NATIONALITY_TYPE, data);
	return response?.data;
});
export const deleteNationalityType = createAsyncThunk('nationalityType/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.NATIONALITY_TYPE, data?.ID);
	return data;
});

export const updateNationalityType = createAsyncThunk('nationalityType/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.NATIONALITY_TYPE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneNationalityType = createAsyncThunk('nationalityType/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.NATIONALITY_TYPE + "/" + data);
	return response?.data;
});

export const nationalityTypeReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addNationalityType.pending, state => {
			state.pending = true;
		})
		.addCase(addNationalityType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addNationalityType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getNationalityType.pending, state => {
			state.pending = true;
		})
		.addCase(getNationalityType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getNationalityType.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneNationalityType.pending, state => {
			state.pending = true;
		})
		.addCase(getOneNationalityType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneNationalityType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteNationalityType.pending, state => {
			state.pending = true;
		})
		.addCase(deleteNationalityType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteNationalityType.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateNationalityType.pending, state => {
			state.pending = true;
		})
		.addCase(updateNationalityType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateNationalityType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default nationalityTypeReducer;

