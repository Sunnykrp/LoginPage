import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data
        try {
            const { data } = await axios.post('/login', {
                email,
                password
            });
            if (data.error) {
                toast.error(data.error);
            }
            else {
                setData({});
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    return (
        <>
            <div><form onSubmit={loginUser}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type='text' placeholder='enter email...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type='text' placeholder='enter password...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                </div>
                <button type='submit'>Login</button>
            </form></div>
        </>
    )
}
export default Login;    