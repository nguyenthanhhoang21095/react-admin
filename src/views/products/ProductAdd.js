import React, { useEffect, useState } from 'react'
import { CCard, CCol, CRow, CButton, CInput, CLabel, CToast, CToastBody, CToastClose } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import api from 'src/services/baseApi'
import endpoint from 'src/services/endpoint'
import { useHistory } from 'react-router-dom'
import Toast from 'src/views/toast/index'
import { useSelector, useDispatch } from 'react-redux'

const ProductAdd = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const toastShow = useSelector(state => state.toastShow);
    
    const [name, setName] = useState("");
    const [linkImage, setLinkImage] = useState("http://placeimg.com/500/500/arch");
    const [originPrice, setOriginPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    const checkValidInfo = () => {
        if (!name || !originPrice || !finalPrice || !linkImage || (originPrice >= finalPrice)) return false;
        return true;
    }

    const showToastOn = (mess="", type="") => {
        dispatch({ type: "SHOW_TOAST", toastShow: {  isShow: true, mess, type }});
        setTimeout(() => { 
            showToastOff()
        }, 3000);
    }

    const showToastOff = () => {
        dispatch({ type: "SHOW_TOAST", toastShow: { isShow: false, mess:'', type: 'normal' }});
    }

    const handleSubmit = () => {
        if (checkValidInfo()) {
            api.post(endpoint["product"], {
                name,
                image: linkImage,
                price: originPrice,
                finalPrice,
            }).then(res => {
                showToastOn('SUCCESS: Added new product' ,"success");
                history.push("/products")
            })
            return;
        }
        showToastOn('FAIL: Please check again your info', "error");
        return;
    }
    return (
        <>
        <CRow>
            <CCol xl={12} lg={12} md={12} sm={12}>
                <CCard className="p-4 d-flex align-items-center">
                    <h2 className="text-center mb-5">Add New Product</h2>
                    <div className="w-50">
                        <div className="d-flex flex-row align-items-center mb-3 justify-content-start">
                            <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Product Name</CLabel>
                            <CInput
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                type="text"
                                placeholder="Type Product Name"
                                aria-label="default input example"
                            />
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3 justify-content-start">
                            <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Link Image</CLabel>
                            <CInput
                                required
                                disabled
                                onChange={(e) => setLinkImage(e.target.value)}
                                value={linkImage}
                                type="text"
                                placeholder="Insert your image link"
                                aria-label="default input example"
                            />
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3 justify-content-start">
                            <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Origin Price</CLabel>
                            <CInput
                                onChange={(e) => setOriginPrice(e.target.value)}
                                value={originPrice}
                                required
                                type="text"
                                placeholder="Add Origin Price"
                                aria-label="default input example"
                            />
                        </div>

                        <div className="d-flex flex-row align-items-center mb-5 justify-content-start">
                            <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Add Final Price</CLabel>
                            <CInput
                                onChange={(e) => setFinalPrice(e.target.value)}
                                value={finalPrice}
                                required
                                type="text"
                                placeholder="Add Final Price"
                                aria-label="default input example"
                            />
                        </div>

                        <div className="d-flex w-50 mx-auto my-0 flex-row align-items-center justify-content-around mb-3">
                            <CButton color="success" className="w-25" onClick={handleSubmit}>Add</CButton>
                            <CButton color="danger" className="w-25" onClick={() => history.push('/products')}>Cancel</CButton>
                        </div>
                    </div>
                </CCard>
            </CCol>
        </CRow>
        <Toast isShow={toastShow.isShow } message={toastShow.mess} type={toastShow.type} />
        </>
    )
}

export default ProductAdd
