import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants";
import generalService from "../../services/generalServices";
import { objectArrayAPIInitialState } from "../types";
import { storeSecureData } from "@/shared/helpers/helper";

export const selectLocalCampain = createAsyncThunk(
  "campain/selectLocal",
  async (data: any) => {
    return data;
  },
);
export const selectCampain = createAsyncThunk(
  "campain/select",
  async (dataId: any) => {
    const response = await generalService.getGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.GET_CAMPAIN + dataId,
    );
    await storeSecureData(
      "SELECTED_COMPAIGN",
      JSON.stringify((response as any)?.data),
    );
    return (response as any)?.data;
  },
);

export const getCampain = createAsyncThunk(
  "campain/get",
  async (userData: string) => {
    const response = await generalService.getGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.GET_CAMPAINS + userData,
    );
    return response?.data as any[];
  },
);

export const addCampain = createAsyncThunk("campain/add", async (data: any) => {
  const response = await generalService.addGeneral(
    reduxConstants.MAIN_API_URL + reduxConstants.CREATE_CAMPAINS,
    data,
  );
  return response;
});
export const deleteCampain = createAsyncThunk(
  "campain/delete",
  async (data: any) => {
    const response = await generalService.deleteGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.GET_CAMPAINS,
      data?.id,
    );
    return response?.data as any;
  },
);

export const updateCampain = createAsyncThunk(
  "campain/update",
  async (data: any) => {
    const response = await generalService.addGeneralMultiPart(
      reduxConstants.MAIN_API_URL +
        reduxConstants.GET_CAMPAINS +
        "/" +
        data.get("id"),
      data,
    );
    return response?.data as any;
  },
);

export const campainReducer = createReducer(
  objectArrayAPIInitialState,
  (builder) => {
    builder
      .addCase(addCampain.pending, (state) => {
        state.pending = true;
      })
      .addCase(addCampain.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = [...state.data, payload];
      })
      .addCase(addCampain.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getCampain.pending, (state) => {
        state.pending = true;
      })
      .addCase(getCampain.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(getCampain.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(selectLocalCampain.pending, (state) => {
        state.pending = true;
      })
      .addCase(selectLocalCampain.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.oneObject = payload;
      })
      .addCase(selectLocalCampain.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(selectCampain.pending, (state) => {
        state.pending = true;
      })
      .addCase(selectCampain.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.oneObject = payload;
      })
      .addCase(selectCampain.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })

      .addCase(deleteCampain.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteCampain.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = state.data.filter(
          (oneCampain: any) => oneCampain.id != payload?.id,
        );
      })
      .addCase(deleteCampain.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })

      .addCase(updateCampain.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateCampain.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = state.data.map((oneCampain: any) =>
          oneCampain.id == payload.id ? payload : oneCampain,
        );
      })
      .addCase(updateCampain.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
);

export default campainReducer;
