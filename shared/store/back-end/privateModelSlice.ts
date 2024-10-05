import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants";
import generalService from "../../services/generalServices";
import { objectArrayAPIInitialState } from "../types";




export const getPrivateModel = createAsyncThunk('privateModel/get', async (userData: string) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.GET_PRIVATE_MODEL_COMPANY + userData);
	return response?.data as any[];
});

export const privateModelReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(getPrivateModel.pending, state => {
			state.pending = true;
		})
		.addCase(getPrivateModel.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getPrivateModel.rejected, state => {
			state.pending = false;
			state.error = true;
		})

});

export default privateModelReducer;

