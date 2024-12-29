import React, { useState } from 'react';
import axios from 'axios';
import { Router, useRouter } from 'next/router';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/users/routes/login', { username, password });
            setMessage('Login successful');
            localStorage.setItem('token', response.data.token);

            router.push('/');
        } catch (error) {
            setMessage('Failed to log in user');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </div>
    );
};

export default Login;