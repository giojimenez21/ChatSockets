import { gapi } from 'gapi-script';
import React, { useContext, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { login, startLogin } from '../../actions/auth';
import { adapterLogin } from '../../adapters/adapters';
import { AuthContext } from '../../context/AuthContext';
const clientGoogle = import.meta.env.VITE_CLIENT_GOOGLE;


export const Login = () => {
    const { dispatch } = useContext(AuthContext);

    const responseGoogle = async ({ tokenId }) => {
        const res = await startLogin({ google_token: tokenId });
        if (res) {
            const { user, token } = res;
            dispatch(login(adapterLogin(user)));
            localStorage.setItem('token', token);
        }
    }

    const start = () => {
        gapi.client.init({
            clientId: clientGoogle,
            scope: ""
        });
    }

    useEffect(() => {
        gapi.load('client:auth2', start);
    }, []);


    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <video autoPlay muted loop className='fixed right-0 bottom-0 w-full bg-cover z-0'>
                <source src='chat.mp4' type='video/mp4' />
            </video>
            <GoogleLogin
                className='z-10 text-black'
                clientId={clientGoogle}
                buttonText="Iniciar sesión"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
