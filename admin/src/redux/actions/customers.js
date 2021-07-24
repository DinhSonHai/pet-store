import { GET_ALL_CUSTOMERS } from "../types";
import { customerAPI } from "../../api";

// get all customers
export const getAllCustomers =
  (q = "d", page) =>
  async (dispatch) => {
    try {
      const res = await customerAPI.get_all(q, page);
      dispatch({
        type: GET_ALL_CUSTOMERS,
        payload: res.data,
      });
    } catch (err) {}
  };
