import { httpClient } from "./../utils/HttpClient";
import {
  TRACK_LINE_FETCHING,
  TRACK_LINE_SUCCESS,
  TRACK_LINE_FAILED,
  server,
} from "../Constants";
//----------------------- Stage Data ---------------------------
export const setStateToSuccess = (payload) => ({
  type: TRACK_LINE_SUCCESS,
  payload,
});

const setStateToFetching = () => ({
  type: TRACK_LINE_FETCHING,
});

const setStateToFailed = () => ({
  type: TRACK_LINE_FAILED,
});

//----------------------- Get Data ---------------------------
export const getOrders = () => {
  return (dispatch) => {
    dispatch(setStateToFetching());
    doGetOrders(dispatch);
  };
};

const doGetOrders = async (dispatch) => {
  try {
    let result = await httpClient.get(server.TRACK_URL_ORDERS_LINE);
    dispatch(setStateToSuccess(result.data));
  } catch (err) {
    dispatch(setStateToFailed());
  }
};

export const updateOrder = (formData, history) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.put(server.TRACK_URL_ORDERS_LINE, formData);
      window.location.reload(true);
      dispatch(setStateToSuccess(result.data));
    } catch (err) {
      dispatch(setStateToFailed());
    }
  };
};

export const findOrders = (formData, history) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.put(server.TRACK_URL_ORDERS_LINE, formData);
      window.location.reload(true);
      dispatch(setStateToSuccess(result.data));
    } catch (err) {
      dispatch(setStateToFailed());
    }
  };
};
