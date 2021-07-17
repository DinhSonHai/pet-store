import React from 'react';
import { useSelector } from 'react-redux';

function useCheckRole() {
  const { user } = useSelector(state => state.auth);
  return { role: user?.role };
}

export default useCheckRole;
