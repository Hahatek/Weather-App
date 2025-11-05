import {useState} from "react"
import { useNavigate } from 'react-router-dom';
import RegisterPage from '../RegisterPage/RegisterPage.jsx';


import Input from "../../components/shared/Input.jsx";
import Button from "../../components/shared/Button.jsx";
import Title from "../../components/shared/Title.jsx";
import Checkbox from "../../components/shared/Checkbox.jsx";

function EmailInput(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    // const handleLogin = async () => {
    // fetch('https://dummyjson.com/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //     username: email,
    //     password: password,
    //     expiresInMins: 30,
    //     }),
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //     if (data.token) {
    //         console.log("Login successful:", data);
    //         localStorage.setItem("token", data.token);
    //         navigate("/");
    //     } else {
    //         alert("Login failed: " + data.message);
    //     }
    //     })
    //     .catch(error => {
    //     console.error("Network error:", error);
    //     });
    // };

    const handleLogin = async () =>{
        fetch('https://dummyjson.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            
            username: 'emilys',
            password: 'emilyspass',
        }),
        })
        .then(res => res.json())
        .then(data =>{
            localStorage.setItem("token", data.token);
            navigate("/");  
        })
    }

    function moveRegisterPage(){
        navigate("/registers")
    }

return(
    <>
        <div className="flex flex-col">
            <Title 
                text="Login"
            />
            {/* Email Input */}
            <Input
                type="text"
                label="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
                    
            {/* Password Input */}
            <Input type={"password"} 
            label={"Password"} 
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
   
            <Checkbox text="Remember me"
            />

            <Button
                text="Log in"
                onClick={handleLogin}
            />

           <div className="flex flex-row justify-center gap-2 mt-5">
            <p>Don't have an account?</p>
            <button type="button" onClick={moveRegisterPage} className="text-acent font-bold ">
                Register Now
            </button>
            </div>
        </div>
    </>
)
}

export default EmailInput;