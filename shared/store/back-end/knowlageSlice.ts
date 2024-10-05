import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants";
import generalService from "../../services/generalServices";
import { objectArrayAPIInitialState } from "../types";



export const getFiltredKnowlage = createAsyncThunk('knowlageByCategory/get', async (data: any) => {
	const response:any = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.KNOWLAGE_GET, data);
	return response?.knowlages;
});


export const getKnowlagesByType = createAsyncThunk('knowlage/getByType', async (data: any) => {
	const response:any = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.KNOWLAGE_GET + "/" + data?.id);
	return response?.knowlages;
});

export const getKnowlage = createAsyncThunk('knowlage/get', async (userData: string) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.KNOWLAGE_GET + userData);
	return response?.data;
});


export const addKnowlage = createAsyncThunk('knowlage/add', async (data: any) => {
	const response = await generalService.addGeneralMultiPart(reduxConstants.MAIN_API_URL + reduxConstants.KNOWLAGE_GET, data);
	return response;
});
export const deleteKnowlage = createAsyncThunk('knowlage/delete', async (data: any) => {
	const response:any = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.KNOWLAGE_GET, data?.id);
	return response?.knowlages;
});

export const updateKnowlage = createAsyncThunk('knowlage/update', async (data: any) => {
	const response:any = await generalService.addGeneralMultiPart(reduxConstants.MAIN_API_URL + reduxConstants.KNOWLAGE_GET + '/' + data.get("id"), data);
	return response?.knowlages;
});




export const knowlageReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addKnowlage.pending, state => {
			state.pending = true;
		})
		.addCase(addKnowlage.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addKnowlage.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getFiltredKnowlage.pending, state => {
			state.pending = true;
		})
		.addCase(getFiltredKnowlage.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getFiltredKnowlage.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getKnowlagesByType.pending, state => {
			state.pending = true;
		})
		.addCase(getKnowlagesByType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getKnowlagesByType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getKnowlage.pending, state => {
			state.pending = true;
		})
		.addCase(getKnowlage.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload as any[];
		})
		.addCase(getKnowlage.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(deleteKnowlage.pending, state => {
			state.pending = true;
		})
		.addCase(deleteKnowlage.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneKnowlage: any) => oneKnowlage.id != payload.id);
		})
		.addCase(deleteKnowlage.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateKnowlage.pending, state => {
			state.pending = true;
		})
		.addCase(updateKnowlage.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneKnowlage: any) => oneKnowlage.id == payload.id ? payload : oneKnowlage);
		})
		.addCase(updateKnowlage.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default knowlageReducer;

