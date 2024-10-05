import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";
import roomInputReducer, { getRoomInput } from "./roomInput";

export const getRoomReservation = createAsyncThunk('roomReservations/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION);
	return response?.data;
});

export const addRoomReservation = createAsyncThunk('roomReservations/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION, data);
	await getRoomInput()
	return response?.data;
});
export const deleteRoomReservation = createAsyncThunk('roomReservations/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION, data?.ID);
	return data;
});

export const updateRoomReservation = createAsyncThunk('roomReservations/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION + '/' + data?.ID, { ...data, ID: undefined });
	return response?.data;
});

export const getOneRoomReservation = createAsyncThunk('roomReservations/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION + "/" + data);
	return response?.data;
});

export const roomReservationReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addRoomReservation.pending, state => {
			state.pending = true;
		})
		.addCase(addRoomReservation.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addRoomReservation.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getRoomReservation.pending, state => {
			state.pending = true;
		})
		.addCase(getRoomReservation.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getRoomReservation.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneRoomReservation.pending, state => {
			state.pending = true;
		})
		.addCase(getOneRoomReservation.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneRoomReservation.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteRoomReservation.pending, state => {
			state.pending = true;
		})
		.addCase(deleteRoomReservation.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteRoomReservation.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateRoomReservation.pending, state => {
			state.pending = true;
		})
		.addCase(updateRoomReservation.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateRoomReservation.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default roomReservationReducer;


