import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getRoomInput = createAsyncThunk('roomInputs/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_INPUT);
	return response?.data;
});

export const addRoomInput = createAsyncThunk('roomInputs/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_INPUT, data);
	return response?.data;
});
export const deleteRoomInput = createAsyncThunk('roomInputs/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_INPUT, data?.ID);
	return data;
});

export const updateRoomInput = createAsyncThunk('roomInputs/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_INPUT + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneRoomInput = createAsyncThunk('roomInputs/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_INPUT + "/" + data);
	return response?.data;
});

export const roomInputReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addRoomInput.pending, state => {
			state.pending = true;
		})
		.addCase(addRoomInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addRoomInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getRoomInput.pending, state => {
			state.pending = true;
		})
		.addCase(getRoomInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getRoomInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneRoomInput.pending, state => {
			state.pending = true;
		})
		.addCase(getOneRoomInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneRoomInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteRoomInput.pending, state => {
			state.pending = true;
		})
		.addCase(deleteRoomInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteRoomInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateRoomInput.pending, state => {
			state.pending = true;
		})
		.addCase(updateRoomInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateRoomInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default roomInputReducer;


