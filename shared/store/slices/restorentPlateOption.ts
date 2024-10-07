import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getRestorentPlateOption = createAsyncThunk('restorentPlateOption/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.RESTORENT_PLATE_OPTION);
	return response?.data;
});

export const addRestorentPlateOption = createAsyncThunk('restorentPlateOption/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.RESTORENT_PLATE_OPTION, data);
	return response?.data;
});
export const deleteRestorentPlateOption = createAsyncThunk('restorentPlateOption/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.RESTORENT_PLATE_OPTION, data?.ID);
	return data;
});

export const updateRestorentPlateOption = createAsyncThunk('restorentPlateOption/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.RESTORENT_PLATE_OPTION + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneRestorentPlateOption = createAsyncThunk('restorentPlateOption/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.RESTORENT_PLATE_OPTION + "/" + data);
	return response?.data;
});

export const restorentPlateOptionReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addRestorentPlateOption.pending, state => {
			state.pending = true;
		})
		.addCase(addRestorentPlateOption.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addRestorentPlateOption.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getRestorentPlateOption.pending, state => {
			state.pending = true;
		})
		.addCase(getRestorentPlateOption.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getRestorentPlateOption.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneRestorentPlateOption.pending, state => {
			state.pending = true;
		})
		.addCase(getOneRestorentPlateOption.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneRestorentPlateOption.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteRestorentPlateOption.pending, state => {
			state.pending = true;
		})
		.addCase(deleteRestorentPlateOption.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteRestorentPlateOption.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateRestorentPlateOption.pending, state => {
			state.pending = true;
		})
		.addCase(updateRestorentPlateOption.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateRestorentPlateOption.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default restorentPlateOptionReducer;
