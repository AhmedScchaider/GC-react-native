import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const deleteUnitReport = createAsyncThunk('address/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT_REPORT, data?.ID);
	return data;
});

export const updateUnitReport = createAsyncThunk('address/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.UNIT_REPORT + '/' + data?.ID, { ...data,ID:undefined});
	return response?.data;
});

export const addressReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(deleteUnitReport.pending, state => {
			state.pending = true;
		})
		.addCase(deleteUnitReport.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteUnitReport.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateUnitReport.pending, state => {
			state.pending = true;
		})
		.addCase(updateUnitReport.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateUnitReport.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default addressReducer;
