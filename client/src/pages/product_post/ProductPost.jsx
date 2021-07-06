import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { ProductPostLoader } from '../../components';
import { getTypeById } from '../../redux/actions/types';
import './styles.scss';
const ProductPost = ({ match, getTypeById, types: { type } }) => {
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    let flag = true;
    async function getData() {
      setIsloading(true);
      await getTypeById(match.params.id);
      setIsloading(false);
    }
    if (flag) {
      getData();
    }
    return () => (flag = false);
  }, [getTypeById, match.params.id]);
  return (
    <section className='products-post'>
      <div className='products-post__wrap container'>
        {isLoading || !type ? (
          <ProductPostLoader />
        ) : (
          <CKEditor
            data={type.content || ''}
            config={{
              toolbar: false,
            }}
            disabled={true}
            editor={ClassicEditor}
          />
        )}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  types: state.types,
});
export default connect(mapStateToProps, { getTypeById })(ProductPost);
