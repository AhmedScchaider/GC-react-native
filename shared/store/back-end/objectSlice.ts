import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants";
import generalService from "../../services/generalServices";
import { objectArrayAPIInitialState } from "../types";



export const getFiltredObject = createAsyncThunk('objectByCategory/get', async (data: any) => {
	const response:any = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.OBJECT_PATH, data);
	return response?.objects ;
});


export const getObjectsByType = createAsyncThunk('object/getByType', async (data: any) => {
	const response:any = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.OBJECT_PATH + "/" + data?.id);
	return response?.objects;
});

export const getObject = createAsyncThunk('object/get', async () => {
	const response:any = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.OBJECT_PATH);
	return response?.objects;
});


export const addObject = createAsyncThunk('object/add', async (data: any) => {
	const response = await generalService.addGeneralMultiPart(reduxConstants.MAIN_API_URL + reduxConstants.OBJECT_PATH, data);
	return response;
});
export const deleteObject = createAsyncThunk('object/delete', async (data: any) => {
	const response:any = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.OBJECT_PATH, data?.id);
	return response?.objects;
});





export const objectReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addObject.pending, state => {
			state.pending = true;
		})
		.addCase(addObject.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addObject.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getFiltredObject.pending, state => {
			state.pending = true;
		})
		.addCase(getFiltredObject.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getFiltredObject.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getObjectsByType.pending, state => {
			state.pending = true;
		})
		.addCase(getObjectsByType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getObjectsByType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getObject.pending, state => {
			state.pending = true;
		})
		.addCase(getObject.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getObject.rejected, state => {
			state.pending = false;
			state.error = true;
		})


		.addCase(deleteObject.pending, state => {
			state.pending = true;
		})
		.addCase(deleteObject.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.id != payload.id);
		})
		.addCase(deleteObject.rejected, state => {
			state.pending = false;
			state.error = true;
		})

});

export default objectReducer;

