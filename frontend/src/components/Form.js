import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/form.css"

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            const res = await api.post(route,{username,password})
            
            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
                navigate("/")
            }
            else{
                navigate("/")
            }
        }
        catch (error){
            const res = await error.response
            let message = ""
            Object.keys(res.data).forEach((key)=>{
                message += `${key}:${res.data[key]}\n`
            })
            alert(message)
        }
        finally{
            setLoading(false)
        }
    };

    const name = method === "login" ? "Login" : "Register";

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                placeholder="Username:"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <input
                className="form-input"
                type="password"
                placeholder="Password:"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button type="submit" className="form-button" >{name}</button>
        </form>
    );
}
export default Form