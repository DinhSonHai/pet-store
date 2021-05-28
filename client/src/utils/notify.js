import { notification, message } from 'antd';
// Notify all errors(login fail,  validate,...) returned by server and show to user
const notifyErrors = (err) => {
  const errors = err.response.data.errors;
  if (errors) {
    errors.forEach((error) =>
      notification['error']({
        message: 'Lỗi',
        description: error.msg,
        placement: 'bottomRight'
      })
    );
  }
};

const notifySuccess = (payload) => {
  if (payload) {
    notification['success']({
      message: 'Thành công',
      description: payload,
      placement: 'bottomRight'
    });
  }
};

// Notify for users when they do somethings.
// example: create/remove/update an user, if complete this function will show a success notification
const notifyActions = (type, payload) => {
  return message[type](payload);
};
export { notifyActions, notifyErrors, notifySuccess };
