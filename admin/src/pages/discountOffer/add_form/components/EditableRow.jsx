import React from 'react';
import { Form } from 'antd';

export const EditableRowContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();  
  return (
    <Form form={form} component={false}>
      <EditableRowContext.Provider value={form}>
        <tr {...props} />
      </EditableRowContext.Provider>
    </Form>
  );
};

export default EditableRow;
