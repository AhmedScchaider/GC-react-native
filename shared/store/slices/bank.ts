import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getBank = createAsyncThunk('bank/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BANK);
	return response?.data;
});

export const addBank = createAsyncThunk('bank/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BANK, data);
	return response?.data;
});
export const deleteBank = createAsyncThunk('bank/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BANK, data?.ID);
	return data;
});

export const updateBank = createAsyncThunk('bank/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BANK + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneBank = createAsyncThunk('bank/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BANK + "/" + data);
	return response?.data;
});

export const bankReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addBank.pending, state => {
			state.pending = true;
		})
		.addCase(addBank.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addBank.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getBank.pending, state => {
			state.pending = true;
		})
		.addCase(getBank.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getBank.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneBank.pending, state => {
			state.pending = true;
		})
		.addCase(getOneBank.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneBank.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteBank.pending, state => {
			state.pending = true;
		})
		.addCase(deleteBank.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteBank.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateBank.pending, state => {
			state.pending = true;
		})
		.addCase(updateBank.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateBank.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default bankReducer;


