import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const DetailDescription = ({ desc }) => {
  return (
    <section className='pet-details__description'>
      <CKEditor
        data={desc || ''}
        config={{
          toolbar: false,
        }}
        disabled={true}
        editor={ClassicEditor}
      />
    </section>
  );
};
export default DetailDescription;
