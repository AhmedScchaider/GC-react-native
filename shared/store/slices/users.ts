import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getUser = createAsyncThunk('users/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.USERS);
	return response?.data;
});

export const addUser = createAsyncThunk('users/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.USERS, data);
	return response?.data;
});
export const deleteUser = createAsyncThunk('users/delete', async (data: any) => {
	await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.USERS, data?.ID);
	return data;
});

export const updateUser = createAsyncThunk('users/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.USERS + '/' + data?.ID, { ...data, ID: undefined });
	return response?.data;
});

export const getOneUser = createAsyncThunk('users/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.USERS + "/" + data);
	return response?.data;
});

export const usersReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addUser.pending, state => {
			state.pending = true;
		})
		.addCase(addUser.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addUser.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getUser.pending, state => {
			state.pending = true;
		})
		.addCase(getUser.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getUser.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneUser.pending, state => {
			state.pending = true;
		})
		.addCase(getOneUser.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneUser.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteUser.pending, state => {
			state.pending = true;
		})
		.addCase(deleteUser.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteUser.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateUser.pending, state => {
			state.pending = true;
		})
		.addCase(updateUser.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateUser.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default usersReducer;
