/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { motion } from 'framer-motion';
import './styles.scss';
export default ({ file, setFile, setImages, images }) => {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      if (setImages) {
        setImages([...images, url]);
      }
      if (setFile) {
        setFile(null);
      }
    }
  }, [url, setFile, setImages]);

  return (
    <motion.div
      className='progress--bar'
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
};
