import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getAddress = createAsyncThunk('address/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ADDRESS);
	return response?.data;
});

export const addAddress = createAsyncThunk('address/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ADDRESS, data);
	return response?.data;
});
export const deleteAddress = createAsyncThunk('address/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ADDRESS, data?.ID);
	return data;
});

export const updateAddress = createAsyncThunk('address/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ADDRESS + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneAddress = createAsyncThunk('address/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ADDRESS + "/" + data);
	return response?.data;
});

export const addressReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addAddress.pending, state => {
			state.pending = true;
		})
		.addCase(addAddress.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addAddress.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getAddress.pending, state => {
			state.pending = true;
		})
		.addCase(getAddress.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getAddress.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneAddress.pending, state => {
			state.pending = true;
		})
		.addCase(getOneAddress.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneAddress.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteAddress.pending, state => {
			state.pending = true;
		})
		.addCase(deleteAddress.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteAddress.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateAddress.pending, state => {
			state.pending = true;
		})
		.addCase(updateAddress.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateAddress.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default addressReducer;
