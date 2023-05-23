import React, { ChangeEvent, FormEvent, useState } from 'react'
import Layout from '../components/layout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../components/ckeditor/ckeditor';
import { ckEditorConfig } from '../components/ckeditorData';
import { EmailData } from '../components/types';
import axios from '../components/axios';
import sweetAlert from '../components/alert';
import LoadingButton from '../components/loadingButton';
// '@ckeditor/ckeditor5-build-classic';

interface Props {
    result: Array<[string, number]>
}

const Home = ({ result }: Props) => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const [data, setData] = useState<EmailData>({
        type: "",
        subject: "",
        body: "",
        skip: null,
        take: null,
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }

    const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsSending(true);
            const res = await axios.post('/email/send', data);
            sweetAlert(
                {
                    icon: 'success',
                    title: `${res.data.message}!! Please check your console for more info.`
                }
            );
            console.log(res.data);
            setIsSending(false);

        } catch (error: any) {
            setIsSending(false);
        }

    }

    const logout = async () => {
        const res = await axios.post('/logout');
        sweetAlert({ icon: 'success', title: res.data.message });
        return setTimeout(() => {
            window.location.pathname = '/';
        }, 3000);
    }

    return (
        <Layout isEmail={true}>
            <div className='email-container'>
                <div className="text-end mb-4">
                    <button
                        className="btn btn-main"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
                <div className="card">
                    <div className="card-header text-capitalize">
                        Email Users
                    </div>
                    <div className="card-body">
                        <form onSubmit={sendEmail}>
                            <div className="mb-3">
                                <select id="type"
                                    className="form-select text-capitalize"
                                    onChange={handleInput}
                                >
                                    <option value="">Select Type...</option>
                                    {result.map((type, key) => (
                                        <option
                                            value={type[0]}
                                            key={key}>
                                            {`${type[0]} - ${type[1]}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <input
                                        type="number"
                                        placeholder='Skip'
                                        className="form-control"
                                        id='skip'
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="col-6">
                                    <input
                                        type="number"
                                        placeholder='Take'
                                        className="form-control"
                                        id='take'
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder='Subject'
                                    id='subject'
                                    className="form-control"
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="mb-3">
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={ckEditorConfig}
                                    onChange={(event, editor) => {
                                        setData({ ...data, body: editor.getData() })
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                className='btn btn-lg btn-main'
                                disabled={isSending ? true : false}
                            >
                                {isSending ? <LoadingButton /> : "Send Email"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home