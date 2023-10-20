import './cadastro.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Cadastro() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = new useNavigate();
    const sendDatas = async (e) => {
        try{   
            e.preventDefault();
            const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
            const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/;

            if(email.trim().length > 0 && password.trim().length > 0) {
                if(!regexEmail.test(email)){
                    alert("Invalid e-mail")
                }else if(!regexPassword.test(password)){
                    alert("Invalid password")
                }else{
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("email", email);
                    formData.append("password", password);
                    await axios.post("http://localhost:4000/register", formData, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    navigate("/home");
                }
            }else{
                alert("E-mail and password fields are required");
            }
        }catch(err){
            if (err.response && err.response.status === 409){
                alert("This e-mail already exists, try other")
            }else{
                console.log("Error: " + err);
            }
        }
    }

    return (
        <div>
            <form>
            <div className="field">
                <label className="label ">Nome</label>
                <div className="control">
                    <input className="input" type="text" 
                    value={name} onChange={(e) => setName(e.target.value)}          
                    placeholder="Seu nome" />
                </div>
            </div>
            <div className="field">
                <label className="label">E-mail</label>
                <div className="control">
                    <input className="input" type="e-mail"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu e-mail"
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Senha</label>
                <div className="control">
                    <input className="input" type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    />
                </div>
            </div>
            <div className="control">
                <button className="button is-primary is-fullwidth" 
                onClick={sendDatas}    
                >Cadastrar</button>
            </div>
            <p className="has-text-centered ">
                Já possui uma conta? <Link to='/'>Faça o login</Link> 
            </p>
            </form>
        </div>
    )
}

export default Cadastro