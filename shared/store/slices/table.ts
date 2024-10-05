import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getTable = createAsyncThunk('table/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TABLE);
	return response?.data;
});

export const addTable = createAsyncThunk('table/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TABLE, data);
	return response?.data;
});
export const deleteTable = createAsyncThunk('table/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TABLE, data?.ID);
	return data;
});

export const updateTable = createAsyncThunk('table/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TABLE + '/' + data?.ID, { ...data,ID:undefined });
	return response?.data;
});

export const getOneTable = createAsyncThunk('table/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TABLE + "/" + data);
	return response?.data;
});

export const tableReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addTable.pending, state => {
			state.pending = true;
		})
		.addCase(addTable.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addTable.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getTable.pending, state => {
			state.pending = true;
		})
		.addCase(getTable.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getTable.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneTable.pending, state => {
			state.pending = true;
		})
		.addCase(getOneTable.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneTable.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteTable.pending, state => {
			state.pending = true;
		})
		.addCase(deleteTable.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteTable.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateTable.pending, state => {
			state.pending = true;
		})
		.addCase(updateTable.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateTable.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default tableReducer;
