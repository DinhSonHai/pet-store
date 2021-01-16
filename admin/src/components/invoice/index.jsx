import React from 'react';
import dayjs from 'dayjs';
import './style.scss';
class ComponentToPrint extends React.Component {
  render() {
    const { order, detail, page } = this.props;
    return (
      <div id='invoice'>
        <div className='invoice overflow-auto'>
          <div style={{ minWidth: '600px' }}>
            <header>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h1 className='logo-invoice'>
                    PetStore<span style={{ fontSize: '3rem' }}>.</span>
                  </h1>
                </div>
                <div className='company-details'>
                  <h1 style={{ fontSize: '2rem' }} className='logo-invoice'>
                    PetStore<span style={{ fontSize: '3rem' }}>.</span>
                  </h1>
                  <div>484 Lê Văn Việt, Quận 9, Tp. Hồ Chí Minh</div>
                  <div>0385 639 830</div>
                  <div>ducdao0906@gmail.com</div>
                </div>
              </div>
            </header>
            <main>
              <div
                style={{ display: 'flex', justifyContent: 'space-between' }}
                className='contacts'
              >
                <div className='invoice-to'>
                  <div className='text-gray-light'>HÓA ĐƠN ĐẾN:</div>
                  <h2 className='to'>{order.name}</h2>
                  <div className='address'>{order.address}</div>
                  <div className='email'>
                    <a href={`mailto:${order.email}`}>{order.email}</a>
                  </div>
                </div>
                <div className='invoice-details'>
                  {/* <h1 className='invoice-id'>{`HD: #${order._id
                    .substring(16, 24)
                    .toUpperCase()}`}</h1> */}
                  <div className='date'>
                    Ngày đặt hàng:{' '}
                    {dayjs(
                      page === 'packed'
                        ? order.createdAt
                        : page === 'bill' && order.orderedAt
                    ).format('DD/MM/YYYY')}
                  </div>
                  <div className='date'>
                    Ngày giao:{' '}
                    {page === 'bill'
                      ? dayjs(order.deliveriedAt).format('DD/MM/YYYY')
                      : page === 'packed' && dayjs().format('DD/MM/YYYY')}
                  </div>
                </div>
              </div>
              <table border='0' cellSpacing='0' cellPadding='0'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className='text-left'>MÔ TẢ</th>
                    <th className='text-right'>ĐƠN GIÁ</th>
                    <th className='text-right'>SỐ LƯỢNG</th>
                    <th className='text-right'>TỔNG</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.map((item, index) => (
                    <tr key={item._id}>
                      <td className='no'>{index + 1}</td>
                      <td className='text-left'>{item.productName}</td>
                      <td className='unit'>
                        {' '}
                        {parseInt(item.price).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                      <td className='qty'>{item.amount}</td>
                      <td className='total'>
                        {parseInt(item.price * item.amount).toLocaleString(
                          'vi-VN',
                          {
                            style: 'currency',
                            currency: 'VND',
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan='2'></td>
                    <td colSpan='2'>TỔNG</td>
                    <td>
                      {parseInt(order.totalMoney).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='2'></td>
                    <td colSpan='2'>TỔNG HÓA ĐƠN</td>
                    <td>
                      {parseInt(order.totalMoney).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className='thanks'>
                Cảm ơn quý khách đã mua hàng tại PetStore.
              </div>
            </main>
            <footer>
              Invoice was created on a computer and is valid without the
              signature and seal.
            </footer>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}
export default ComponentToPrint;
