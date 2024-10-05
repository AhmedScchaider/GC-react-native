import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getClient = createAsyncThunk('client/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT);
	return response?.data;
});

export const addClient = createAsyncThunk('client/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT, data);
	return response?.data;
});
export const deleteClient = createAsyncThunk('client/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT, data?.ID);
	return data;
});

export const updateClient = createAsyncThunk('client/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneClient = createAsyncThunk('client/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT + "/" + data);
	return response?.data;
});

export const clientReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addClient.pending, state => {
			state.pending = true;
		})
		.addCase(addClient.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addClient.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getClient.pending, state => {
			state.pending = true;
		})
		.addCase(getClient.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getClient.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneClient.pending, state => {
			state.pending = true;
		})
		.addCase(getOneClient.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneClient.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteClient.pending, state => {
			state.pending = true;
		})
		.addCase(deleteClient.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteClient.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateClient.pending, state => {
			state.pending = true;
		})
		.addCase(updateClient.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateClient.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default clientReducer;


