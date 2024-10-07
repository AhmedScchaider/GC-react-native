import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getIdentityType = createAsyncThunk('identityType/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.IDENTITY_TYPE);
	return response?.data;
});

export const addIdentityType = createAsyncThunk('identityType/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.IDENTITY_TYPE, data);
	return response?.data;
});
export const deleteIdentityType = createAsyncThunk('identityType/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.IDENTITY_TYPE, data?.ID);
	return data;
});

export const updateIdentityType = createAsyncThunk('identityType/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.IDENTITY_TYPE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneIdentityType = createAsyncThunk('identityType/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.IDENTITY_TYPE + "/" + data);
	return response?.data;
});

export const identityTypeReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addIdentityType.pending, state => {
			state.pending = true;
		})
		.addCase(addIdentityType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addIdentityType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getIdentityType.pending, state => {
			state.pending = true;
		})
		.addCase(getIdentityType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getIdentityType.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneIdentityType.pending, state => {
			state.pending = true;
		})
		.addCase(getOneIdentityType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneIdentityType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteIdentityType.pending, state => {
			state.pending = true;
		})
		.addCase(deleteIdentityType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteIdentityType.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateIdentityType.pending, state => {
			state.pending = true;
		})
		.addCase(updateIdentityType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateIdentityType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default identityTypeReducer;

