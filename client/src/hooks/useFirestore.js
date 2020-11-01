import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    //projectFirestore.collection trả về một function
    const unSub = projectFirestore
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      }); //onSnapshot gọi callback mỗi khi collection có sự thay đổi
    return () => unSub();
  }, [collection]);

  return { docs };
};

export default useFirestore;
