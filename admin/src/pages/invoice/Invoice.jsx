import React, { Fragment } from 'react';
import ReactToPrint from 'react-to-print';
import { ComponentToPrint, Loader } from '../../components';
import { Button, message } from 'antd';
import api from '../../api';

class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      order: null,
      detail: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }
  async fetchData() {
    const { page } = this.props.match.params;
    try {
      this.setState({ ...this.state, isFetching: true });
      let response;
      if (page === 'packed') {
        response = await api.get(
          `/orders/invoice/${this.props.match.params.id}`
        );
      }
      if (page === 'bill') {
        response = await api.get(
          `/bills/invoice/${this.props.match.params.id}`
        );
      }
      this.setState({
        ...this.state,
        isFetching: false,
        order: response.data.order,
        detail: response.data.detail,
      });
    } catch (err) {
      this.setState({ ...this.state, isFetching: false });
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => message.error(error.msg));
      }
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { isFetching, detail, order } = this.state;
    const { page } = this.props.match.params;
    return (
      <div>
        {isFetching || !order ? (
          <Loader />
        ) : (
          <Fragment>
            <ReactToPrint
              trigger={() => (
                <div
                  style={{
                    margin: '2rem 3rem 0 auto',
                    width: 'fit-content',
                  }}
                >
                  <Button type='primary'>In hóa đơn</Button>
                </div>
              )}
              content={() => this.componentRef}
            />
            <ComponentToPrint
              page={page}
              order={order}
              detail={detail}
              ref={(el) => (this.componentRef = el)}
            />
          </Fragment>
        )}
      </div>
    );
  }
}
export default Invoice;
