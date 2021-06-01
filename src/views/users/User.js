import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import api from 'src/services/baseApi'
import endpoint from 'src/services/endpoint'
// import userData from './userData'

const User = ({match}) => {
  const history = useHistory()

  const [userData, setUserData] = useState(null)
  useEffect(()=> {
    api.get(endpoint["user"]).then(res => {
      if (res) setUserData(res)
    });
  },[])
  const user = userData?.find(user => user.id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) : 
    [['id', (<span>Not found</span>)]]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <p className="d-inline-block font-weight-bold mb-0"> User id: {match.params.id}</p>
              <CButton color="info" onClick={() => history.push(`/cart/${match.params.id}`)}>
                <CIcon size={'sm'} name={'cilPencil'} />  View Cart
              </CButton>
            </div>

          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
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

export default User
