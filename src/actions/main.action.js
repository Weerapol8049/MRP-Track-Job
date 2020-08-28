import  { httpClient } from "./../utils/HttpClient";
import {
    TRACK_FETCHING,
    TRACK_SUCCESS,
    TRACK_FAILED,
    server,
  } from "../Constants";
//----------------------- Stage Data ---------------------------
  export const setStateToSuccess = (payload) => ({
    type: TRACK_SUCCESS,
    payload,
  });
  
  const setStateToFetching = () => ({
    type: TRACK_FETCHING,
  });
  
  const setStateToFailed = () => ({
    type: TRACK_FAILED,
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
      let result = await httpClient.get(server.TRACK_URL_ORDERS);
      dispatch(setStateToSuccess(result.data));
    } catch (err) {
      dispatch(setStateToFailed());
    }
  };
