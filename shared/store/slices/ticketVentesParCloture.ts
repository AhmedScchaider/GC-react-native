import { createAsyncThunk, createReducer, isRejected } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getVentesAritcleProduitParCloture = createAsyncThunk('getVentesAritcleProduitParCloture/getMy', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TICKET_VENTES_PAR_CLOTURE + "/" + data?.ID);
	return response?.data;
});

export const ticketVentesParClotureReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(getVentesAritcleProduitParCloture.pending, state => {
			state.pending = true;
		})
		.addCase(getVentesAritcleProduitParCloture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getVentesAritcleProduitParCloture.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default ticketVentesParClotureReducer;
