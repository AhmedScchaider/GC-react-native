import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getTicketParClotures = createAsyncThunk('ticketParCloture/getMy', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKETS_PAR_CLOTURE + "/" + data?.ID);
	return response?.data;
});
export const getOpenTicketLastCloture = createAsyncThunk('ticket/getOpenTicketLastCloture', async (lastClotureTicketOpen: string) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET_BY_CLOTURE_OPEN + lastClotureTicketOpen);
	return response?.data;
});
export const getTicketsForTable = createAsyncThunk('ticketForTable/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET_FOR_TABLE);
	return response?.data;
});

export const getTicket = createAsyncThunk('ticket/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET);
	return response?.data;
});

export const addTicket = createAsyncThunk('ticket/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET, data);
	return response?.data;
});
export const deleteTicket = createAsyncThunk('ticket/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET, data?.ID);
	return data;
});

export const updateTicket = createAsyncThunk('ticket/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET + '/' + data?.ID, { ...data, ID: undefined });
	return response?.data;
});

export const getOneTicket = createAsyncThunk('ticket/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET + "/" + data);
	return response?.data;
});
export const clearOneTicket = createAsyncThunk('ticket/clearOne', async () => {
	return {};
});

export const ticketReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addTicket.pending, state => {
			state.pending = true;
		})
		.addCase(addTicket.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...(state.data ?? []), payload];
		})
		.addCase(addTicket.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getTicketParClotures.pending, state => {
			state.pending = true;
		})
		.addCase(getTicketParClotures.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getTicketParClotures.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOpenTicketLastCloture.pending, state => {
			state.pending = true;
		})
		.addCase(getOpenTicketLastCloture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOpenTicketLastCloture.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getTicket.pending, state => {
			state.pending = true;
		})
		.addCase(getTicket.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getTicket.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getTicketsForTable.pending, state => {
			state.pending = true;
		})
		.addCase(getTicketsForTable.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getTicketsForTable.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(clearOneTicket.pending, state => {
			state.pending = true;
		})
		.addCase(clearOneTicket.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = payload;
		})
		.addCase(clearOneTicket.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getOneTicket.pending, state => {
			state.pending = true;
		})
		.addCase(getOneTicket.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = payload;
		})
		.addCase(getOneTicket.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteTicket.pending, state => {
			state.pending = true;
		})
		.addCase(deleteTicket.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteTicket.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateTicket.pending, state => {
			state.pending = true;
		})
		.addCase(updateTicket.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject?.ID == payload?.ID ? payload : oneObject);
		})
		.addCase(updateTicket.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default ticketReducer;
