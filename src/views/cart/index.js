import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import api from 'src/services/baseApi'
import endpoint from 'src/services/endpoint'

const Cart = ({match}) => {
  const [cartData, setCartData] = useState([])
  useEffect(()=> {
    api.get(`${endpoint["cart"]}/${match.params.id}`).then(res => {
      if (res) setCartData(res.cart);
    });
  },[match.params.id])
  // const cart = cartData ? cartData : 
  //   [['id', (<span>Not found</span>)]]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
              <p className="d-inline-block font-weight-bold mb-0"> Cart id: {match.params.id}</p>
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    cartData.length && cartData.map((item, index) => {
                      console.log(item);
                      return (
                        <tr key={item.id.toString()}>
                          <td>name</td>
                          <td>
                            <strong>{item.name}</strong>
                          </td>
                        </tr>
                      )
                    })
                    
                  }
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Cart
