import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getRole = createAsyncThunk('role/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROLE);
	return response?.data;
});

export const addRole = createAsyncThunk('role/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROLE, data);
	return response?.data;
});
export const deleteRole = createAsyncThunk('role/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROLE, data?.ID);
	return data;
});

export const updateRole = createAsyncThunk('role/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROLE + '/' + data?.ID, { ...data, ID: undefined });
	return response?.data;
});

export const getOneRole = createAsyncThunk('role/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROLE + "/" + data);
	return response?.data;
});

export const roleReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addRole.pending, state => {
			state.pending = true;
		})
		.addCase(addRole.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addRole.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getRole.pending, state => {
			state.pending = true;
		})
		.addCase(getRole.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getRole.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneRole.pending, state => {
			state.pending = true;
		})
		.addCase(getOneRole.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneRole.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteRole.pending, state => {
			state.pending = true;
		})
		.addCase(deleteRole.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteRole.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateRole.pending, state => {
			state.pending = true;
		})
		.addCase(updateRole.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateRole.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default roleReducer;


