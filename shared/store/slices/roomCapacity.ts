import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getRoomCapacity = createAsyncThunk('roomCapacity/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_CAPACITY);
	return response?.data;
});

export const addRoomCapacity = createAsyncThunk('roomCapacity/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_CAPACITY, data);
	return response?.data;
});
export const deleteRoomCapacity = createAsyncThunk('roomCapacity/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_CAPACITY, data?.ID);
	return data;
});

export const updateRoomCapacity = createAsyncThunk('roomCapacity/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_CAPACITY + '/' + data?.ID, { ...data,ID:undefined });
	return response?.data;
});

export const getOneRoomCapacity = createAsyncThunk('roomCapacity/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_CAPACITY + "/" + data);
	return response?.data;
});

export const roomCapacityReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addRoomCapacity.pending, state => {
			state.pending = true;
		})
		.addCase(addRoomCapacity.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addRoomCapacity.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getRoomCapacity.pending, state => {
			state.pending = true;
		})
		.addCase(getRoomCapacity.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getRoomCapacity.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneRoomCapacity.pending, state => {
			state.pending = true;
		})
		.addCase(getOneRoomCapacity.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneRoomCapacity.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteRoomCapacity.pending, state => {
			state.pending = true;
		})
		.addCase(deleteRoomCapacity.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteRoomCapacity.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateRoomCapacity.pending, state => {
			state.pending = true;
		})
		.addCase(updateRoomCapacity.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateRoomCapacity.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default roomCapacityReducer;

