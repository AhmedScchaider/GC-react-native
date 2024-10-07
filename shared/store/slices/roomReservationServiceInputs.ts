import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getRoomReservationServiceInput = createAsyncThunk('roomReservationServiceInput/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION_SERVICE_INPUT);
	return response?.data;
});

export const addRoomReservationServiceInput = createAsyncThunk('roomReservationServiceInput/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION_SERVICE_INPUT, data);
	return response?.data;
});
export const deleteRoomReservationServiceInput = createAsyncThunk('roomReservationServiceInput/delete', async (data: any) => {
	await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION_SERVICE_INPUT, data?.ID);
	return data;
});

export const updateRoomReservationServiceInput = createAsyncThunk('roomReservationServiceInput/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION_SERVICE_INPUT + '/' + data?.ID, { ...data, ID: undefined });
	return response?.data;
});

export const getOneRoomReservationServiceInput = createAsyncThunk('roomReservationServiceInput/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ROOM_RESERVATION_SERVICE_INPUT + "/" + data);
	return response?.data;
});

export const roomReservationServiceInputReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addRoomReservationServiceInput.pending, state => {
			state.pending = true;
		})
		.addCase(addRoomReservationServiceInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addRoomReservationServiceInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getRoomReservationServiceInput.pending, state => {
			state.pending = true;
		})
		.addCase(getRoomReservationServiceInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getRoomReservationServiceInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneRoomReservationServiceInput.pending, state => {
			state.pending = true;
		})
		.addCase(getOneRoomReservationServiceInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneRoomReservationServiceInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteRoomReservationServiceInput.pending, state => {
			state.pending = true;
		})
		.addCase(deleteRoomReservationServiceInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteRoomReservationServiceInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateRoomReservationServiceInput.pending, state => {
			state.pending = true;
		})
		.addCase(updateRoomReservationServiceInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateRoomReservationServiceInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default roomReservationServiceInputReducer;
