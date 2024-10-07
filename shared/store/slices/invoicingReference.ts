import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getInvoicingReference = createAsyncThunk('invoicingReference/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.INVOICING_REFERENCE);
	return response?.data;
});

export const addInvoicingReference = createAsyncThunk('invoicingReference/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.INVOICING_REFERENCE, data);
	return response?.data;
});
export const deleteInvoicingReference = createAsyncThunk('invoicingReference/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.INVOICING_REFERENCE, data?.ID);
	return data;
});

export const updateInvoicingReference = createAsyncThunk('invoicingReference/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.INVOICING_REFERENCE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneInvoicingReference = createAsyncThunk('invoicingReference/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.INVOICING_REFERENCE + "/" + data);
	return response?.data;
});

export const invoicingReferenceReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addInvoicingReference.pending, state => {
			state.pending = true;
		})
		.addCase(addInvoicingReference.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addInvoicingReference.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getInvoicingReference.pending, state => {
			state.pending = true;
		})
		.addCase(getInvoicingReference.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getInvoicingReference.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneInvoicingReference.pending, state => {
			state.pending = true;
		})
		.addCase(getOneInvoicingReference.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneInvoicingReference.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteInvoicingReference.pending, state => {
			state.pending = true;
		})
		.addCase(deleteInvoicingReference.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteInvoicingReference.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateInvoicingReference.pending, state => {
			state.pending = true;
		})
		.addCase(updateInvoicingReference.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateInvoicingReference.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default invoicingReferenceReducer;
