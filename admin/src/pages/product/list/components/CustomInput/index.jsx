import React, { useState } from 'react';
import { Input } from 'antd';

const CustomInput = React.forwardRef((props, ref) => {
  const {
    placeholder, handleOnChange, ...otherProps
  } = props;

  const [inputText, setInputText] = useState('');

  const onTextChange = (e) => {
    const searchValue = e.target.value;
    setInputText(searchValue);
    handleOnChange(searchValue);
  };

  return (
    <Input
      ref={ref}
      value={inputText}
      placeholder={placeholder}
      onChange={onTextChange}
      {...otherProps}
    />
  );
});

export default CustomInput;
