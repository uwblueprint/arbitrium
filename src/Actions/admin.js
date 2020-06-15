// src/js/actions/index.js

import { SET_ADMIN_VIEW_STATS } from "../Constants/ActionTypes";
import { getAdminViewStats } from "../requests/get";

export const setAdminViewStats = (payload) => ({
  type: SET_ADMIN_VIEW_STATS,
  payload
});

export const fetchAdminViewStats = (app_id) => (dispatch) => {
  getAdminViewStats(app_id).then((res) => {
    dispatch(setAdminViewStats(res));
  });
};
