import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getArticleProduit = createAsyncThunk(
  "articleProduit/getMy",
  async () => {
    const response = await generalService.getGeneralAxios(
      reduxConstants.MAIN_API_URL + reduxConstants.ARTICLES_PRODUCTS,
    );
    return response?.data?.data;
  },
);

export const addArticleProduit = createAsyncThunk(
  "articleProduit/add",
  async (data: any) => {
    const response = await generalService.addGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.ARTICLES_PRODUCTS,
      data,
    );
    return response?.data;
  },
);
export const deleteArticleProduit = createAsyncThunk(
  "articleProduit/delete",
  async (data: any) => {
    const response = await generalService.deleteGeneral(
      reduxConstants.MAIN_API_URL + reduxConstants.ARTICLES_PRODUCTS,
      data?.ID,
    );
    return data;
  },
);

export const updateArticleProduit = createAsyncThunk(
  "articleProduit/update",
  async (data: any) => {
    const response = await generalService.updateGeneral(
      reduxConstants.MAIN_API_URL +
        reduxConstants.ARTICLES_PRODUCTS +
        "/" +
        data?.ID,
      { ...data, ID: undefined },
    );
    return response?.data;
  },
);

export const getOneArticleProduit = createAsyncThunk(
  "articleProduit/getOne",
  async (data: any) => {
    const response = await generalService.getGeneral(
      reduxConstants.MAIN_API_URL +
        reduxConstants.ARTICLES_PRODUCTS +
        "/" +
        data,
    );
    return response?.data;
  },
);

export const articleProduitReducer = createReducer(
  objectArrayAPIInitialState,
  (builder) => {
    builder
      .addCase(addArticleProduit.pending, (state) => {
        state.pending = true;
      })
      .addCase(addArticleProduit.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = [...state.data, payload];
      })
      .addCase(addArticleProduit.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getArticleProduit.pending, (state) => {
        state.pending = true;
      })
      .addCase(getArticleProduit.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(getArticleProduit.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })

      .addCase(getOneArticleProduit.pending, (state) => {
        state.pending = true;
      })
      .addCase(getOneArticleProduit.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(getOneArticleProduit.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(deleteArticleProduit.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteArticleProduit.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = state.data.filter(
          (oneObject: any) => oneObject.ID != payload.ID,
        );
      })
      .addCase(deleteArticleProduit.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })

      .addCase(updateArticleProduit.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateArticleProduit.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = state.data.map((oneObject: any) =>
          oneObject.ID == payload.ID ? payload : oneObject,
        );
      })
      .addCase(updateArticleProduit.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
);

export default articleProduitReducer;
