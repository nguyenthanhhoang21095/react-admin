import React, { useEffect, useState } from 'react'
import { CCard, CCol, CRow, CButton, CInput, CLabel, CToast, CToastBody, CToastClose } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import api from 'src/services/baseApi'
import endpoint from 'src/services/endpoint'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'src/views/toast/index'

const CreateUser = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const toastShow = useSelector(state => state.toastShow);

    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const showToastOn = (mess = "", type = "") => {
        dispatch({ type: "SHOW_TOAST", toastShow: { isShow: true, mess, type } });
        setTimeout(() => {
            showToastOff()
        }, 3000);
    }

    const showToastOff = () => {
        dispatch({ type: "SHOW_TOAST", toastShow: { isShow: false, mess: '', type: 'normal' } });
    }

    const checkValidInfo = () => {
        if (!account || !password || !fullName || !phone) return false;
        const phoneRule = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
        if (!phoneRule.test(phone)) return false;
        return true;
    }
    const handleSubmit = () => {
        if (checkValidInfo()) {
            console.log('here');
            api.post(endpoint["user"], {
                account,
                password,
                fullName,
                phone,
                address,
            }).then(res => {
                showToastOn('SUCCESS: Added new product', "success");
                history.push("/users")
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
                        <h2 className="text-center mb-5">Create New User</h2>
                        <div className="w-50">
                            <div className="d-flex flex-row align-items-center mb-3 justify-content-start">
                                <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Account</CLabel>
                                <CInput
                                    onChange={(e) => setAccount(e.target.value)}
                                    value={account}
                                    required
                                    type="text"
                                    placeholder="Type your account"
                                    aria-label="default input example"
                                />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-3 justify-content-start">
                                <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Password</CLabel>
                                <CInput
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    placeholder="Type your password"
                                    aria-label="default input example"
                                />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-3 justify-content-start">
                                <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Full Name</CLabel>
                                <CInput
                                    onChange={(e) => setFullName(e.target.value)}
                                    value={fullName}
                                    required
                                    type="text"
                                    placeholder="Type your full name"
                                    aria-label="default input example"
                                />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-3 justify-content-start">
                                <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Phone</CLabel>
                                <CInput
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    required
                                    type="text"
                                    placeholder="Type your phone number"
                                    aria-label="default input example"
                                />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-5 justify-content-start">
                                <CLabel className="w-50 mb-0 text-nowrap font-weight-bold">Address</CLabel>
                                <CInput
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                    type="text"
                                    placeholder="Type your address"
                                    aria-label="default input example"
                                />
                            </div>

                            <div className="d-flex w-50 mx-auto my-0 flex-row align-items-center justify-content-around mb-3">
                                <CButton color="success" className="w-25" onClick={handleSubmit}>Add</CButton>
                                <CButton color="danger" className="w-25" onClick={() => history.push('/users')}>Cancel</CButton>
                            </div>
                        </div>
                    </CCard>
                </CCol>
            </CRow>
            <Toast isShow={toastShow.isShow} message={toastShow.mess} type={toastShow.type} />
        </>
    )
}

export default CreateUser
