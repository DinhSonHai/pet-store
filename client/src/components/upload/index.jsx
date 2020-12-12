/* eslint-disable import/no-anonymous-default-export */
import { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { motion } from 'framer-motion';
import './styles.scss';
export default ({ file, setFile, setImageUpdateUser }) => {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      if (setImageUpdateUser) {
        setImageUpdateUser(url);
      }
      if (setFile) {
        setFile(null);
      }
    }
  }, [url, setFile, setImageUpdateUser]);

  return (
    <motion.div
      className='progress--bar'
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
};
