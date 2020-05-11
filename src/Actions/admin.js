// src/js/actions/index.js

import { SET_ADMIN_VIEW_STATS } from "../Constants/ActionTypes";
import GET from "../requests/get";

export const setAdminViewStats = payload => ({
  type: SET_ADMIN_VIEW_STATS,
  payload
});

export const fetchAdminViewStats = app_id => dispatch => {
  GET.getAdminViewStats(app_id).then(res => {
    dispatch(setAdminViewStats(res));
  });
};