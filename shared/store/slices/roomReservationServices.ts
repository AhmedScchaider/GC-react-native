import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getRoomReservationService = createAsyncThunk('roomReservationService/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION_SERVICE);
	return response?.data;
});

export const addRoomReservationService = createAsyncThunk('roomReservationService/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION_SERVICE, data);
	return response?.data;
});
export const deleteRoomReservationService = createAsyncThunk('roomReservationService/delete', async (data: any) => {
	await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION_SERVICE, data?.ID);
	return data;
});

export const updateRoomReservationService = createAsyncThunk('roomReservationService/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION_SERVICE + '/' + data?.ID, { ...data, ID: undefined });
	return response?.data;
});

export const getOneRoomReservationService = createAsyncThunk('roomReservationService/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION_SERVICE + "/" + data);
	return response?.data;
});

export const roomReservationServiceReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addRoomReservationService.pending, state => {
			state.pending = true;
		})
		.addCase(addRoomReservationService.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addRoomReservationService.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getRoomReservationService.pending, state => {
			state.pending = true;
		})
		.addCase(getRoomReservationService.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getRoomReservationService.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneRoomReservationService.pending, state => {
			state.pending = true;
		})
		.addCase(getOneRoomReservationService.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneRoomReservationService.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteRoomReservationService.pending, state => {
			state.pending = true;
		})
		.addCase(deleteRoomReservationService.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteRoomReservationService.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateRoomReservationService.pending, state => {
			state.pending = true;
		})
		.addCase(updateRoomReservationService.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateRoomReservationService.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default roomReservationServiceReducer;
