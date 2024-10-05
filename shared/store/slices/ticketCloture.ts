import { createAsyncThunk, createReducer, isRejected } from "@reduxjs/toolkit";
import { resolveTo } from "@remix-run/router";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getLastTicketCloture = createAsyncThunk(
  "ticketCloture/getLastTicketCloture",
  async () => {
    const response = await generalService.getGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.TICKET_LAST_CLOTURE,
    );
    return response?.data;
  },
);
export const getAllTicketCloture = createAsyncThunk(
  "ticketCloture/getMy",
  async () => {
    const response = await generalService.getGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.ALL_TICKET_CLOTURE,
    );
    return response?.data;
  },
);
export const getTicketClotureWithDetails = createAsyncThunk(
  "ticketClotureWithDetails/getMy",
  async () => {
    const response = await generalService.getGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.TICKET_CLOTURE_WITH_DETAILS,
    );
    return response?.data;
  },
);
export const getTicketCloture = createAsyncThunk(
  "ticketCloture/getMy",
  async () => {
    const response = await generalService.getGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.TICKET_CLOTURE,
    );
    return response?.data;
  },
);

export const addTicketCloture = createAsyncThunk(
  "ticketCloture/add",
  async (data: any) => {
    const response = await generalService.addGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.TICKET_CLOTURE,
      data,
    );
    return response?.data;
  },
);
export const deleteTicketCloture = createAsyncThunk(
  "ticketCloture/delete",
  async (data: any) => {
    const response = await generalService.deleteGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.TICKET_CLOTURE,
      data?.ID,
    );
    return data;
  },
);

export const updateTicketCloture = createAsyncThunk(
  "ticketCloture/update",
  async (data: any) => {
    const response = await generalService.updateGeneral(
      reduxConstants.MAIN_API_URL +
        reduxConstants.TICKET_CLOTURE +
        "/" +
        data?.ID,
      { ...data, ID: undefined },
    );
    return response?.data;
  },
);

export const getOneTicketCloture = createAsyncThunk(
  "ticketCloture/getOne",
  async (data: any) => {
    const response = await generalService.getGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.TICKET_CLOTURE + "/" + data,
    );
    return response?.data;
  },
);

export const ticketClotureReducer = createReducer(
  objectArrayAPIInitialState,
  (builder) => {
    builder
      .addCase(addTicketCloture.pending, (state) => {
        state.pending = true;
      })
      .addCase(addTicketCloture.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = [...state.data, payload];
      })
      .addCase(addTicketCloture.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getTicketClotureWithDetails.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTicketClotureWithDetails.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.oneObject = payload;
      })
      .addCase(getTicketClotureWithDetails.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getLastTicketCloture.pending, (state) => {
        state.pending = true;
      })
      .addCase(getLastTicketCloture.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.oneObject = payload;
      })
      .addCase(getLastTicketCloture.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getTicketCloture.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTicketCloture.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(getTicketCloture.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })

      .addCase(getOneTicketCloture.pending, (state) => {
        state.pending = true;
      })
      .addCase(getOneTicketCloture.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(getOneTicketCloture.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(deleteTicketCloture.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteTicketCloture.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = state.data.filter(
          (oneObject: any) => oneObject.ID != payload.ID,
        );
      })
      .addCase(deleteTicketCloture.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })

      .addCase(updateTicketCloture.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateTicketCloture.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = state.data.map((oneObject: any) =>
          oneObject.ID == payload.ID
            ? { ...oneObject, isClosed: payload?.isClosed }
            : oneObject,
        );
      })
      .addCase(updateTicketCloture.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
);

export default ticketClotureReducer;
