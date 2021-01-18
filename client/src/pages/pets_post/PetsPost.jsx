import { useState, useEffect } from 'react';
import { Loader } from '../../components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { getTypeById } from '../../redux/actions/types';
import './styles.scss';
const PetsPost = ({ match, getTypeById, types: { type } }) => {
  const [isLoading, setIsloading] = useState(false);
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
    <section className='pets-post'>
      <div className='pets-post__wrap container'>
        {isLoading || !type ? (
          <Loader className={'pets-post-loader'} />
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
export default connect(mapStateToProps, { getTypeById })(PetsPost);
