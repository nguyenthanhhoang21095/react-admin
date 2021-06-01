import React from 'react'
import { CToaster, CToast, CToastBody } from '@coreui/react'
import './toast.css'

const Toast = ({ isShow = false, message="", type="normal" }) => {
    let toast = { position: 'top-right' }
    return (
        <CToaster
            className={`toaster ${isShow ? 'toaster-slide-in': 'toaster-slide-out'}`}
            position={toast.position}
            key={'toaster' + toast.position}
        >
            {   message && 
                <CToast
                    key={'toast'}
                    show={true}
                >
                    <CToastBody className={`toast-body ${type}`}>{message}</CToastBody>
                </CToast>

            }
        </CToaster>
    )
}

export default Toast;