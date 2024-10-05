import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { objectArrayAPIInitialState } from "../types";


export const setSaveKnowlageAudianceSegmentIsLoading = createAsyncThunk('isLoadingByCategory/setsetSaveKnowlageAudianceSegmentIsLoadingIsLoading', async (data: boolean) => {
	return data;
});
export const setSaveKnowlageFileUploadIsLoading = createAsyncThunk('isLoadingByCategory/setSaveKnowlageFileUploadIsLoading', async (data: boolean) => {
	return data;
});
export const setSaveKnowlageTextIsLoading = createAsyncThunk('isLoadingByCategory/setSaveKnowlageTextIsLoading', async (data: boolean) => {
	return data;
});

export const setSaveKnowlageWebsiteIsLoading = createAsyncThunk('isLoadingByCategory/setSaveKnowlageWebsiteIsLoading', async (data: boolean) => {
	return data;
});
export const setUrlPreparationIsLoading = createAsyncThunk('isLoadingByCategory/setPreparationIsLoading', async (data: boolean) => {
	return data;
});
export const setCreativeIsLoading = createAsyncThunk('isLoadingByCategory/setCreativeLoading', async (data: boolean) => {
	return data;
});
export const setScoringIsLoading = createAsyncThunk('isLoadingByCategory/setScoringIsLoading', async (data: boolean) => {
	return data;
});

export const isLoadingReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(setSaveKnowlageAudianceSegmentIsLoading.pending, state => {
			state.pending = true;
		})
		.addCase(setSaveKnowlageAudianceSegmentIsLoading.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = { ...state.oneObject, saveKnowlageAudianceSegment: payload };
		})
		.addCase(setSaveKnowlageAudianceSegmentIsLoading.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(setSaveKnowlageTextIsLoading.pending, state => {
			state.pending = true;
		})
		.addCase(setSaveKnowlageTextIsLoading.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = { ...state.oneObject, saveKnowlageText: payload };
		})
		.addCase(setSaveKnowlageTextIsLoading.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(setSaveKnowlageWebsiteIsLoading.pending, state => {
			state.pending = true;
		})
		.addCase(setSaveKnowlageWebsiteIsLoading.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = { ...state.oneObject, saveKnowlageWebsite: payload };
		})
		.addCase(setSaveKnowlageWebsiteIsLoading.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(setUrlPreparationIsLoading.pending, state => {
			state.pending = true;
		})
		.addCase(setUrlPreparationIsLoading.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = { ...state.oneObject, urlPreparation: payload };
		})
		.addCase(setUrlPreparationIsLoading.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(setScoringIsLoading.pending, state => {
			state.pending = true;
		})
		.addCase(setScoringIsLoading.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = { ...state.oneObject, scoring: payload };
		})
		.addCase(setScoringIsLoading.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(setCreativeIsLoading.pending, state => {
			state.pending = true;
		})
		.addCase(setCreativeIsLoading.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = { ...state.oneObject, creative: payload };
		})
		.addCase(setCreativeIsLoading.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default isLoadingReducer;

