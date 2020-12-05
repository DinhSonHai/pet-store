/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Form } from 'antd';
import { activate } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import jwt from 'jsonwebtoken';
import './styles.scss';

const Activate = ({ match, activate }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    token: '',
  });
  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token).user;
    if (token) {
      setFormData({ ...formData, name, token });
    }
  }, []);
  const { name, token } = formData;
  const onFinish = async () => {
    setIsProcessing(true);
    await activate({ token });
    setIsProcessing(false);
  };
  return (
    <section className='activate'>
      <div className='activate__wrap container'>
        <div className='activate__content'>
          <Row gutter={[0, 0]}>
            <Col xs={24} sm={18} lg={12}>
              <Card>
                <h1 className='activate__title'>Xin chào {name}</h1>
                <Form
                  name='normal_activate_form'
                  initialValues={{
                    remember: true,
                    size: 'large',
                  }}
                  size='large'
                  onFinish={onFinish}
                >
                  <Form.Item>
                    <Button
                      style={{ width: '100%' }}
                      loading={isProcessing}
                      type='primary'
                      htmlType='submit'
                    >
                      Kích hoạt
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
Activate.propTypes = {
  activate: PropTypes.func.isRequired,
};
export default connect(null, { activate })(Activate);
