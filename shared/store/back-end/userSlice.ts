import { createAsyncThunk, createReducer, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { objectAPIInitialState } from '../types';
import { checkLocalStorageObjectContent } from '@/shared/helpers/localHelpers';



export const clearActiveUser = createAsyncThunk('user/clearActiveUser', async () => {
	return {};
});

export const getActiveUser = createAsyncThunk('user/getActiveUser', async (user: any) => {
	if (user?.companyId) {
		localStorage.setItem("IS_OAUTH", JSON.stringify(true));
		localStorage.setItem("USER", JSON.stringify(user));
		localStorage.setItem("TOKEN", JSON.stringify(user?.token));
		return user
	} else {
		localStorage.setItem("IS_OAUTH", JSON.stringify(false));
		return JSON.parse((localStorage.getItem("USER") == "undefined" ? "{}" : localStorage.getItem("USER")) || "{}");
		// return checkLocalStorageObjectContent("USER");
	}
});

export const userReducer = createReducer(objectAPIInitialState, builder => {
	builder
		.addCase(clearActiveUser.pending, state => {
			state.pending = true;
		})
		.addCase(clearActiveUser.fulfilled, (state) => {
			state.pending = false;
			state.data = {};
		})
		.addCase(clearActiveUser.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getActiveUser.pending, state => {
			state.pending = true;
		})
		.addCase(getActiveUser.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getActiveUser.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});


export default userReducer;



export const selectUser = (state: RootState) => state.user

export const userSelector = createSelector(
	selectUser,
	state => state
)

