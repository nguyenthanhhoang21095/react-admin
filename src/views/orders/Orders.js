import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CCollapse
} from '@coreui/react'
import api from 'src/services/baseApi'
import endpoint from 'src/services/endpoint'
import { useDispatch } from 'react-redux'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Orders = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [orderList, setOrderList] = useState([])
  const [details, setDetails] = useState([])
  const itemPerPage = 5;

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/orders?page=${newPage}`)
  }

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }


  useEffect(() => {
    !orderList.length && api.get(endpoint["order"]).then(res => {
      if (res) setOrderList(res)
    });
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12} lg={12} md={6} sm={6}>
        <CCard>
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <p className="d-inline-block font-weight-bold">Order List</p>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={orderList}
              fields={[
                { key: 'id', _classes: 'font-weight-bold' },
                'account', 'phone', 'address', 'isActive',
                {
                  key: 'show_details',
                  label: '',
                  _style: { width: '1%' },
                  sorter: false,
                  filter: false
                }
              ]}
              hover
              striped
              sorter
              responsive
              itemsPerPage={itemPerPage}
              activePage={page}
              columnFilter
              tableFilter
              // clickableRows
              // onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),

                'show_details':
                  (item, index) => (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        onClick={() => { toggleDetails(index) }}
                      >
                        {details.includes(index) ? 'Hide' : 'Show'}
                      </CButton>
                    </td>
                  ),

                'details':
                  (item, index) => {
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <h4>
                            {item.name}
                          </h4>

                          <CButton
                            size="sm"
                            color="info"
                            onClick={() => history.push(`/orders/${item.id}`)}>
                            View Detail
                          </CButton>
                        </CCardBody>
                      </CCollapse>
                    )
                  }
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={Math.ceil(orderList.length / itemPerPage)}
              align="center"
              doubleArrows
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Orders
