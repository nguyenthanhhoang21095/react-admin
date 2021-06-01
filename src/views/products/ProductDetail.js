import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import api from 'src/services/baseApi'
import endpoint from 'src/services/endpoint'

const ProductDetail = ({match}) => {
  const [productData, setProductData] = useState(null)
  useEffect(()=> {
    api.get(endpoint["product"]).then(res => {
      if (res) setProductData(res)
    });
  },[])
  const product = productData?.find(item => item.id.toString() === match.params.id)
  const ProductDetails = product ? Object.entries(product) : 
    [['id', (<span>Not found</span>)]]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Product Id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    ProductDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td>
                          {key === "image" ? 
                            <img src={value} alt="" width="150px" height="150px" />
                            :
                            <strong>{value}</strong>
                          }
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

export default ProductDetail
