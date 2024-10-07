import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getVille = createAsyncThunk('ville/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.VILLE);
	return response?.data;
});

export const addVille = createAsyncThunk('ville/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.VILLE, data);
	return response?.data;
});
export const deleteVille = createAsyncThunk('ville/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.VILLE, data?.ID);
	return data;
});

export const updateVille = createAsyncThunk('ville/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.VILLE + '/' + data?.ID, { ...data,ID:undefined });
	return response?.data;
});

export const getOneVille = createAsyncThunk('ville/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.VILLE + "/" + data);
	return response?.data;
});

export const villeReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addVille.pending, state => {
			state.pending = true;
		})
		.addCase(addVille.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addVille.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getVille.pending, state => {
			state.pending = true;
		})
		.addCase(getVille.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getVille.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneVille.pending, state => {
			state.pending = true;
		})
		.addCase(getOneVille.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneVille.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteVille.pending, state => {
			state.pending = true;
		})
		.addCase(deleteVille.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteVille.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateVille.pending, state => {
			state.pending = true;
		})
		.addCase(updateVille.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateVille.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default villeReducer;


