import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getSubClient = createAsyncThunk('subClient/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.SUB_CLIENT);
	return response?.data;
});

export const addSubClient = createAsyncThunk('subClients/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.SUB_CLIENT, data);
	return response?.data;
});
export const deleteSubClient = createAsyncThunk('subClients/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.SUB_CLIENT, data?.ID);
	return data;
});

export const updateSubClient = createAsyncThunk('subClients/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.SUB_CLIENT + '/' + data?.ID, { ...data,ID:undefined });
	return response?.data;
});

export const getOneSubClient = createAsyncThunk('subClients/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.SUB_CLIENT + "/" + data);
	return response?.data;
});

export const subClientsReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addSubClient.pending, state => {
			state.pending = true;
		})
		.addCase(addSubClient.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addSubClient.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getSubClient.pending, state => {
			state.pending = true;
		})
		.addCase(getSubClient.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getSubClient.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneSubClient.pending, state => {
			state.pending = true;
		})
		.addCase(getOneSubClient.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneSubClient.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteSubClient.pending, state => {
			state.pending = true;
		})
		.addCase(deleteSubClient.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteSubClient.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateSubClient.pending, state => {
			state.pending = true;
		})
		.addCase(updateSubClient.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateSubClient.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default subClientsReducer;

