import  { httpClient } from "./../utils/HttpClient";
import {
    TRACK_BU_FETCHING,
    TRACK_BU_SUCCESS,
    TRACK_BU_FAILED,
    server,
  } from "../Constants";

//----------------------- Stage BU ---------------------------
   const setStateBUToSuccess = (payload) => ({
    type: TRACK_BU_SUCCESS,
    payload,
  });
  
  const setStateBUToFetching = () => ({
    type: TRACK_BU_FETCHING,
  });
  
  const setStateBUToFailed = () => ({
    type: TRACK_BU_FAILED,
  });

//----------------------- Stage BU ---------------------------
  export const getBU = () => {
    return (dispatch) => {
      dispatch(setStateBUToFetching());
      doGetBU(dispatch);
    };
  };

  const doGetBU = async (dispatch) => {
    try {
      let result = await httpClient.get(server.TRACK_URL_BU);
      dispatch(setStateBUToSuccess(result.data));
    } catch (err) {
      dispatch(setStateBUToFailed());
    }
  };