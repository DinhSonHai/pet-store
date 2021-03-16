import { GET_ALL_TYPES, GET_TYPE_BY_ID } from '../types';
import { typeAPI } from '../../api';
import { notifyErrors } from '../../utils/notify';

// Lấy loại sản phẩm theo typeId
export const getTypeById = (id) => async (dispatch) => {
  try {
    const res = await typeAPI.get_by_id(id);
    dispatch({
      type: GET_TYPE_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    notifyErrors(err);
  }
};

// Lấy loại sản phẩm theo catId
export const getTypesByCatId = (id) => async (dispatch) => {
  try {
    const res = await typeAPI.get_by_catId(id);
    dispatch({
      type: GET_ALL_TYPES,
      payload: res.data,
    });
  } catch (err) {}
};
