import React from 'react'

interface Props {
    children: JSX.Element | JSX.Element[];
    isEmail?: boolean;
}

const Layout = ({ children, isEmail = false }: Props) => {
    return (
        <div className="vh-100 d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div
                        className={
                            isEmail ? "col-12" :
                                "col-md-8 col-lg-6 offset-md-2 offset-lg-3"
                        }>
                        {children}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Layout