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

const Products = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const itemPerPage = 10;

  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [productList, setProductList] = useState([])
  const [details, setDetails] = useState([])

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

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/products?page=${newPage}`)
  }

  const handleRemoveProduct = (id) => {
    api.remove(endpoint["product"], {
      id
    }).then(res => {
      if (res) setProductList(res)
    });
  }

  const handleEditProduct = (action = "add", data = null) => {
    dispatch({
      type: "EDIT_PRODUCT",
      productEdit: {
        mode: action,
        data,
      }
    })
    history.push('/add/products')
  }

  useEffect(() => {
    !productList.length && api.get(endpoint["product"]).then(res => {
      if (res) setProductList(res)
    });
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12} lg={12} md={12} sm={12}>
        <CCard>
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <p className="d-inline-block font-weight-bold">Product List</p>
              <CButton color="warning" variant="outline" onClick={() => handleEditProduct()}>Add New Product</CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={productList}
              fields={[
                { key: 'id', _classes: 'font-weight-bold' },
                'name', 'inStock', 'isActive',
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
              // onRowClick={(item) => history.push(`/products/${item.id}`)}
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
                            onClick={() => history.push(`/products/${item.id}`)}>
                            View Detail
                          </CButton>
                          <CButton
                            size="sm"
                            color="warning"
                            className="ml-1"
                            onClick={() => handleEditProduct("edit", item)}
                          >
                            Edit
                          </CButton>
                          <CButton
                            size="sm"
                            color="danger"
                            className="ml-1"
                            onClick={() => handleRemoveProduct(item.id)}
                          >
                            Delete
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
              pages={Math.ceil(productList.length / itemPerPage)}
              align="center"
              doubleArrows
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Products
