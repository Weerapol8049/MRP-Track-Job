export const TRACK_FETCHING = "TRACK_FETCHING";
export const TRACK_SUCCESS = "TRACK_SUCCESS";
export const TRACK_FAILED = "TRACK_FAILED";

export const TRACK_LINE_FETCHING = "TRACK_LINE_FETCHING";
export const TRACK_LINE_SUCCESS = "TRACK_LINE_SUCCESS";
export const TRACK_LINE_FAILED = "TRACK_LINE_FAILED";

export const TRACK_BU_FETCHING = "TRACK_BU_FETCHING";
export const TRACK_BU_SUCCESS = "TRACK_BU_SUCCESS";
export const TRACK_BU_FAILED = "TRACK_BU_FAILED";

export const apiUrl = "http://localhost:8085/api/v2";
//export const apiUrl = "http://starmark.work/";

export const API_URL = "http://starmark.work/axtrackjobservice/api/trackjobline";
//export const API_URL = "http://localhost:5413/api/trackjobline";
export const server = {
    LOGIN_URL: `authen/login`,
    REGISTER_URL: `authen/register`,
    TRACK_URL_ORDERS: `trackjob/orders`,
    TRACK_URL_ORDERS_LINE: `trackjobline/orders`,
    TRACK_URL_BU: `trackjob/bu`,
  };

  export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";
  export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";