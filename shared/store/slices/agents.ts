import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getAgents = createAsyncThunk('agent/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.AGENT);
	return response?.data;
});

export const addAgents = createAsyncThunk('agent/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.AGENT, data);
	return response?.data;
});
export const deleteAgents = createAsyncThunk('agent/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.AGENT, data?.ID);
	return data;
});

export const updateAgents = createAsyncThunk('agent/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.AGENT + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneAgents = createAsyncThunk('agent/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.AGENT + "/" + data);
	return response?.data;
});

export const agentReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addAgents.pending, state => {
			state.pending = true;
		})
		.addCase(addAgents.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addAgents.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getAgents.pending, state => {
			state.pending = true;
		})
		.addCase(getAgents.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getAgents.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneAgents.pending, state => {
			state.pending = true;
		})
		.addCase(getOneAgents.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneAgents.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteAgents.pending, state => {
			state.pending = true;
		})
		.addCase(deleteAgents.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteAgents.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateAgents.pending, state => {
			state.pending = true;
		})
		.addCase(updateAgents.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateAgents.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default agentReducer;
