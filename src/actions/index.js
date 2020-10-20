import axios from 'axios';
import {
  FETCH_USERS,
  FETCH_USER
} from "./types";
import { URL } from "../config";

export const checkCardInSystem = (data) => async dispatch => {
  console.log("checkCardInSystem!!!", data)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  let res = {};
  if (data.type === 'card') {
    // const res = await axios.get(`${URL}'/is-card'/cardNo=${data.cardNo}/cardPin=${data.cardPin}`, config)
     res = await axios.get(`${URL}/is-card/${data.card_no}/${data.card_pin}`, config)
      .catch(e => {
        console.log(e);
      });
  }
  else if (data.type === 'account') {
     res = await axios.get(`${URL}/is-account/${data.account_no}`, config)
      .catch(e => {
        console.log(e);
      });
  }

  console.log("res*** ", res)

  // if (res) {

  //   dispatch({ type: FETCH_USERS, payload: res });
  // }
};

export const saveRegisterUser = (data) => async dispatch => {

  console.log("save re user**** ", data)
  const res = await axios.post(`${URL}/registeredUser`, data)
    .catch (e => {
      console.log(e);
      if (e.response && e.response.data) {
      }
    });

  if (res && res.data) {
    dispatch({ type: FETCH_USER, payload: res.data });
  }
};

