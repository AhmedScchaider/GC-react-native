import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getFloors = createAsyncThunk('floors/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FLOOR);
	return response?.data;
});

export const addFloors = createAsyncThunk('floors/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FLOOR, data);
	return response?.data;
});
export const deleteFloors = createAsyncThunk('floors/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FLOOR, data?.ID);
	return data;
});

export const updateFloors = createAsyncThunk('floors/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FLOOR + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneFloors = createAsyncThunk('floors/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FLOOR + "/" + data);
	return response?.data;
});

export const floorReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addFloors.pending, state => {
			state.pending = true;
		})
		.addCase(addFloors.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addFloors.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getFloors.pending, state => {
			state.pending = true;
		})
		.addCase(getFloors.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getFloors.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneFloors.pending, state => {
			state.pending = true;
		})
		.addCase(getOneFloors.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneFloors.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteFloors.pending, state => {
			state.pending = true;
		})
		.addCase(deleteFloors.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteFloors.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateFloors.pending, state => {
			state.pending = true;
		})
		.addCase(updateFloors.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateFloors.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default floorReducer;


