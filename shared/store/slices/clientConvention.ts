import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getClientConvention = createAsyncThunk('clientConvention/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT_CONVENTION);
	return response?.data;
});

export const addClientConvention = createAsyncThunk('clientConvention/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT_CONVENTION, data);
	return response?.data;
});
export const deleteClientConvention = createAsyncThunk('clientConvention/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT_CONVENTION, data?.ID);
	return data;
});

export const updateClientConvention = createAsyncThunk('clientConvention/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT_CONVENTION + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneClientConvention = createAsyncThunk('clientConvention/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT_CONVENTION + "/" + data);
	return response?.data;
});

export const clientConventionReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addClientConvention.pending, state => {
			state.pending = true;
		})
		.addCase(addClientConvention.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addClientConvention.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getClientConvention.pending, state => {
			state.pending = true;
		})
		.addCase(getClientConvention.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getClientConvention.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneClientConvention.pending, state => {
			state.pending = true;
		})
		.addCase(getOneClientConvention.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneClientConvention.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteClientConvention.pending, state => {
			state.pending = true;
		})
		.addCase(deleteClientConvention.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteClientConvention.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateClientConvention.pending, state => {
			state.pending = true;
		})
		.addCase(updateClientConvention.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateClientConvention.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default clientConventionReducer;
