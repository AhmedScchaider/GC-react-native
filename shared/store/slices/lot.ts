import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getLot = createAsyncThunk('lot/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.LOT);
	return response?.data;
});

export const addLot = createAsyncThunk('lot/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.LOT, data);
	return response?.data;
});
export const deleteLot = createAsyncThunk('lot/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.LOT, data?.ID);
	return data;
});

export const updateLot = createAsyncThunk('lot/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.LOT + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneLot = createAsyncThunk('lot/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.LOT + "/" + data);
	return response?.data;
});

export const lotReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addLot.pending, state => {
			state.pending = true;
		})
		.addCase(addLot.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addLot.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getLot.pending, state => {
			state.pending = true;
		})
		.addCase(getLot.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getLot.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneLot.pending, state => {
			state.pending = true;
		})
		.addCase(getOneLot.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneLot.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteLot.pending, state => {
			state.pending = true;
		})
		.addCase(deleteLot.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteLot.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateLot.pending, state => {
			state.pending = true;
		})
		.addCase(updateLot.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateLot.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default lotReducer;

