import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";


export const getTicketInput = createAsyncThunk('ticketInputs/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET_INPUT);
	return response?.data;
});
export const deleteTicketInput = createAsyncThunk('ticketInputs/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET_INPUT, data?.ID);
	return data;
});

export const updateTicketInput = createAsyncThunk('ticketInputs/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET_INPUT + '/' + data?.ID, { ...data, ID: undefined });
	return response?.data;
});


export const ticketInputsReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(deleteTicketInput.pending, state => {
			state.pending = true;
		})
		.addCase(deleteTicketInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteTicketInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getTicketInput.pending, state => {
			state.pending = true;
		})
		.addCase(getTicketInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getTicketInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(updateTicketInput.pending, state => {
			state.pending = true;
		})
		.addCase(updateTicketInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateTicketInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default ticketInputsReducer;
