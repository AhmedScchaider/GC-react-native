import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getTax = createAsyncThunk('tax/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TAX);
	return response?.data;
});

export const addTax = createAsyncThunk('tax/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TAX, data);
	return response?.data;
});
export const deleteTax = createAsyncThunk('tax/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TAX, data?.ID);
	return data;
});

export const updateTax = createAsyncThunk('tax/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TAX + '/' + data?.ID, { ...data,ID:undefined });
	return response?.data;
});

export const getOneTax = createAsyncThunk('tax/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TAX + "/" + data);
	return response?.data;
});

export const taxReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addTax.pending, state => {
			state.pending = true;
		})
		.addCase(addTax.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addTax.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getTax.pending, state => {
			state.pending = true;
		})
		.addCase(getTax.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getTax.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneTax.pending, state => {
			state.pending = true;
		})
		.addCase(getOneTax.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneTax.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteTax.pending, state => {
			state.pending = true;
		})
		.addCase(deleteTax.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteTax.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateTax.pending, state => {
			state.pending = true;
		})
		.addCase(updateTax.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateTax.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default taxReducer;


