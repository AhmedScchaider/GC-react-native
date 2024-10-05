import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getRooms = createAsyncThunk('rooms/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM);
	return response?.data;
});

export const addRooms = createAsyncThunk('rooms/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM, data);
	return response?.data;
});
export const deleteRooms = createAsyncThunk('rooms/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM, data?.ID);
	return data;
});

export const updateRooms = createAsyncThunk('rooms/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneRooms = createAsyncThunk('rooms/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM + "/" + data);
	return response?.data;
});

export const roomReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addRooms.pending, state => {
			state.pending = true;
		})
		.addCase(addRooms.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addRooms.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getRooms.pending, state => {
			state.pending = true;
		})
		.addCase(getRooms.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getRooms.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneRooms.pending, state => {
			state.pending = true;
		})
		.addCase(getOneRooms.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneRooms.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteRooms.pending, state => {
			state.pending = true;
		})
		.addCase(deleteRooms.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteRooms.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateRooms.pending, state => {
			state.pending = true;
		})
		.addCase(updateRooms.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateRooms.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default roomReducer;


