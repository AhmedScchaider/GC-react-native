import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getTicketRoomInputInput = createAsyncThunk('address/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET_ROOM_INPUT_INPUT);
	return response?.data;
});

export const addTicketRoomInputInput = createAsyncThunk('address/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET_ROOM_INPUT_INPUT, data);
	return response?.data;
});
export const deleteTicketRoomInputInput = createAsyncThunk('address/delete', async (data: any) => {
	await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET_ROOM_INPUT_INPUT, data?.ID);
	return data;
});

export const updateTicketRoomInputInput = createAsyncThunk('address/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET_ROOM_INPUT_INPUT + '/' + data?.ID, { ...data, ID: undefined });
	return response?.data;
});

export const getOneTicketRoomInputInput = createAsyncThunk('address/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET_ROOM_INPUT_INPUT + "/" + data);
	return response?.data;
});

export const addressReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addTicketRoomInputInput.pending, state => {
			state.pending = true;
		})
		.addCase(addTicketRoomInputInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addTicketRoomInputInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getTicketRoomInputInput.pending, state => {
			state.pending = true;
		})
		.addCase(getTicketRoomInputInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getTicketRoomInputInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneTicketRoomInputInput.pending, state => {
			state.pending = true;
		})
		.addCase(getOneTicketRoomInputInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneTicketRoomInputInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteTicketRoomInputInput.pending, state => {
			state.pending = true;
		})
		.addCase(deleteTicketRoomInputInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteTicketRoomInputInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateTicketRoomInputInput.pending, state => {
			state.pending = true;
		})
		.addCase(updateTicketRoomInputInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateTicketRoomInputInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default addressReducer;
