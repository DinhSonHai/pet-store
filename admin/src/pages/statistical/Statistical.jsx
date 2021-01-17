import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';
import { TodayRevenues, TodayBills, TodaySales, NewestOrders, NewestReviews, NewestComments, MonthlyRevenues, AnnualRevenues } from '../../icons';

const Statistical = (

) => {
  return (
    <section className="statistical">
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
      </Breadcrumb>
        <div
          className='category__wrap site-layout-background'
          style={{ padding: '1.5rem', minHeight: '100vh' }}
        >

        </div>
    </section>
  )
}

Statistical.propTypes = {
  
};

const mapStateToProps = (state) => ({
  statistical: state.statistical,
  auth: state.auth
});

export default connect(mapStateToProps, {})(Statistical);
