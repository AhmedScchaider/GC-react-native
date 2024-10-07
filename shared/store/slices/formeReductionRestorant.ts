import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getFormReductionRestorant = createAsyncThunk('formReductionRestorant/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FORM_REDUCTION_RESTORANT);
	return response?.data;
});

export const addFormReductionRestorant = createAsyncThunk('formReductionRestorants/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FORM_REDUCTION_RESTORANT, data);
	return response?.data;
});
export const deleteFormReductionRestorant = createAsyncThunk('formReductionRestorants/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FORM_REDUCTION_RESTORANT, data?.ID);
	return data;
});

export const updateFormReductionRestorant = createAsyncThunk('formReductionRestorants/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FORM_REDUCTION_RESTORANT + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneFormReductionRestorant = createAsyncThunk('formReductionRestorants/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FORM_REDUCTION_RESTORANT + "/" + data);
	return response?.data;
});

export const formReductionRestorantsReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addFormReductionRestorant.pending, state => {
			state.pending = true;
		})
		.addCase(addFormReductionRestorant.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addFormReductionRestorant.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getFormReductionRestorant.pending, state => {
			state.pending = true;
		})
		.addCase(getFormReductionRestorant.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getFormReductionRestorant.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneFormReductionRestorant.pending, state => {
			state.pending = true;
		})
		.addCase(getOneFormReductionRestorant.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneFormReductionRestorant.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteFormReductionRestorant.pending, state => {
			state.pending = true;
		})
		.addCase(deleteFormReductionRestorant.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteFormReductionRestorant.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateFormReductionRestorant.pending, state => {
			state.pending = true;
		})
		.addCase(updateFormReductionRestorant.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateFormReductionRestorant.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default formReductionRestorantsReducer;
