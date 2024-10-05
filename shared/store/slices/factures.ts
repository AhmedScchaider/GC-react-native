import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getFacture = createAsyncThunk('facture/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FACTURE);
	return response?.data;
});

export const addFacture = createAsyncThunk('facture/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FACTURE, data);
	return response?.data;
});
export const deleteFacture = createAsyncThunk('facture/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FACTURE, data?.ID);
	return data;
});

export const updateFacture = createAsyncThunk('facture/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FACTURE + '/' + data?.ID, { ...data, ID: undefined });
	return response?.data;
});

export const getOneFacture = createAsyncThunk('facture/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FACTURE + "/" + data);
	return response?.data;
});

export const factureReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addFacture.pending, state => {
			state.pending = true;
		})
		.addCase(addFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getFacture.pending, state => {
			state.pending = true;
		})
		.addCase(getFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneFacture.pending, state => {
			state.pending = true;
		})
		.addCase(getOneFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data?.map((oneMapped: any) => oneMapped?.ID == payload?.ID ?
				{
					...oneMapped,
					RoomInputInvoiceInputs: oneMapped?.RoomInputInvoiceInputs,
					TicketInvoiceInputs: oneMapped?.TicketInvoiceInputs,
					RoomReservationServiceInputs: oneMapped?.RoomReservationServiceInputs
				}
				: oneMapped);
			state.oneObject = payload;
		})
		.addCase(getOneFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteFacture.pending, state => {
			state.pending = true;
		})
		.addCase(deleteFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateFacture.pending, state => {
			state.pending = true;
		})
		.addCase(updateFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default factureReducer;

