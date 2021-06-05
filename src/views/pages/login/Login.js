import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Toast from 'src/views/toast/index'
import { useHistory } from "react-router-dom";
import api from 'src/services/baseApi'
import endpoint from 'src/services/endpoint'
import { useSelector, useDispatch } from 'react-redux'
import { saveDataLocal } from 'src/utils'

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toastShow = useSelector(state => state.toastShow);

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const showToastOn = (mess = "", type = "") => {
    dispatch({ type: "SHOW_TOAST", toastShow: { isShow: true, mess, type } });
    setTimeout(() => {
      showToastOff()
    }, 3000);
  }

  const showToastOff = () => {
    dispatch({ type: "SHOW_TOAST", toastShow: { isShow: false, mess: '', type: 'normal' } });
  }

  const validateLogin = async () => {
    if (!account.length || !password.length) {
      showToastOn('FAIL: Please check again your info', "error");
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    try {
      const isValid = await validateLogin();
      if (isValid) {
        const res = await api.post(endpoint["login"], {
          account,
          password
        })
        if (res && res.refreshToken) {
          const { refreshToken } = res;
          saveDataLocal('refresh_token', refreshToken);
          dispatch({type: 'GET_USER', userInfo: res })
          showToastOn('SUCCESS: Login success', "success");
          setTimeout(() => history.push("/dashboard"), 1000);
        } else {
          showToastOn('FAIL: Incorrect input', "error");
        }
      }
    }
    catch(error)  {
      showToastOn('FAIL: Incorrect input', "error");
      console.error(error)
    }
   
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput value={account} onChange={(e) => setAccount(e.target.value)} type="text" placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={handleLogin} color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>

      <Toast isShow={toastShow.isShow} message={toastShow.mess} type={toastShow.type} />

    </div>
  )
}

export default Login
