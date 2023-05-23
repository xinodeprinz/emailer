import React, { ChangeEvent, useState } from 'react'
import { FormEvent } from 'react';
import Layout from '../components/layout'
import { LoginData, LoginResponse } from '../components/types';
import axios from '../components/axios';
import sweetAlert from '../components/alert';

const Login = () => {

    const [data, setData] = useState<LoginData>({
        email: "",
        password: "",
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await axios.post('/', data)
        sweetAlert({ icon: 'success', title: (res.data as LoginResponse).message });
        return setTimeout(() => {
            window.location.pathname = '/home';
        }, 3000);
    }
    return (
        <Layout>
            <div className="card">
                <div className="card-header">
                    Login
                </div>
                <div className="card-body">
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder='Email'
                                id='email'
                                className="form-control"
                                onChange={handleInput}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className='form-control'
                                id="password"
                                placeholder='Password'
                                onChange={handleInput}
                            />
                        </div>
                        <button type="submit" className='btn btn-lg btn-main'>Login</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login