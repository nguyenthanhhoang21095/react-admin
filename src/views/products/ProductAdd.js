import React, {  useState } from 'react'
import { CCard, CCol, CRow, CButton, CInput, CLabel  } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
import api from 'src/services/baseApi'
import endpoint from 'src/services/endpoint'
import { useHistory } from 'react-router-dom'
import Toast from 'src/views/toast/index'
import { useSelector, useDispatch } from 'react-redux'

const ProductAdd = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const toastShow = useSelector(state => state.toastShow);
    const productEdit = useSelector(state => state.productEdit);

    const modeChange = productEdit.mode;
    const productEditData = productEdit.data;

    const [name, setName] = useState(productEditData?.name ?? "");
    const [linkImage, setLinkImage] = useState(productEditData?.image ?? "http://placeimg.com/500/500/arch");
    const [originPrice, setOriginPrice] = useState(productEditData?.price ?? 0);
    const [finalPrice, setFinalPrice] = useState(productEditData?.finalPrice ?? 0);
    const [inStock, setInStock] = useState(productEditData?.inStock ?? false)
    const [isActive, setIsActive] = useState(productEditData?.isActive ?? false)

    const checkValidInfo = () => {
        if (!name || !originPrice || !finalPrice || !linkImage || (originPrice >= finalPrice)) return false;
        return true;
    }

    const showToastOn = (mess = "", type = "") => {
        dispatch({ type: "SHOW_TOAST", toastShow: { isShow: true, mess, type } });
        setTimeout(() => {
            showToastOff()
        }, 3000);
    }

    const showToastOff = () => {
        dispatch({ type: "SHOW_TOAST", toastShow: { isShow: false, mess: '', type: 'normal' } });
    }

    const handleSubmit = () => {
        if (checkValidInfo()) {
            modeChange === "add" ? completeAddProduct() : completeEditProduct();
            return;
        }
        showToastOn('FAIL: Please check again your info', "error");
        return;
    }

    const completeAddProduct = () => {
        api.post(endpoint["product"], {
            name,
            image: linkImage,
            price: originPrice,
            finalPrice,
        }).then(res => {
            showToastOn('SUCCESS: Added new product', "success");
            history.goBack()
        })
    }

    const completeEditProduct = () => {
        productEditData.id && api.update(endpoint["product"], {
            id: productEditData.id,
            name,
            image: linkImage,
            price: originPrice,
            finalPrice,
            percenStar: productEditData?.percenStar ?? 0,
            inStock,
            isActive
        }).then(res => {
            showToastOn('SUCCESS: Edit success product', "success");
            history.goBack()
        })
    }

    return (
        <>
            <CRow>
                <CCol xl={12} lg={12} md={12} sm={12}>
                    <CCard className="p-4 d-flex align-items-center">
                        <h2 className="text-center mb-5">{modeChange === "add" ? 'Add New' : 'Edit'} Product</h2>
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

                            <div className={`d-flex flex-row align-items-center mb-${modeChange === "add" ? 5 : 3} justify-content-start`}>
                                <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Final Price</CLabel>
                                <CInput
                                    onChange={(e) => setFinalPrice(e.target.value)}
                                    value={finalPrice}
                                    required
                                    type="text"
                                    placeholder="Add Final Price"
                                    aria-label="default input example"
                                />
                            </div>

                            {modeChange === "edit" &&
                                <>
                                    <div className="d-flex flex-row align-items-center mb-3 justify-content-start">
                                        <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Stock Status</CLabel>
                                        <CInput
                                            onChange={(e) => setInStock(e.target.value)}
                                            value={inStock}
                                            required
                                            type="text"
                                            placeholder="Edit Product Stock"
                                            aria-label="default input example"
                                        />
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-5 justify-content-start">
                                        <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Active Status</CLabel>
                                        <CInput
                                            onChange={(e) => setIsActive(e.target.value)}
                                            value={isActive}
                                            required
                                            type="text"
                                            placeholder="Edit Product Active"
                                            aria-label="default input example"
                                        />
                                    </div>
                                </>
                            }

                            <div className="d-flex w-50 mx-auto my-0 flex-row align-items-center justify-content-around mb-3">
                                <CButton color="success" className="w-25" onClick={handleSubmit}>{modeChange === "add" ? "Add" : "Update"}</CButton>
                                <CButton color="danger" className="w-25" onClick={() => history.goBack()}>Cancel</CButton>
                            </div>
                        </div>
                    </CCard>
                </CCol>
            </CRow>
            <Toast isShow={toastShow.isShow} message={toastShow.mess} type={toastShow.type} />
        </>
    )
}

export default ProductAdd
