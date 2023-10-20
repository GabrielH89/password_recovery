import './login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = new useNavigate();

    const doLogin = async (e) => {
        try{
            e.preventDefault();
            if(email.trim().length > 0 && password.trim().length > 0){
                const formData = new FormData();
                formData.append("email", email);
                formData.append("password", password);
                const response = await axios.post("http://localhost:4000/login", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const {email: loggedEmail, token} = response.data
                console.log(loggedEmail);
                console.log(token);
                navigate("/home");
            }else{
                alert("E-mail and password fields are required");
            }
        }catch(err){
            if (err.response && err.response.status === 409){
                alert("This user doesn't exists")
            }else{
                console.log("Error: " + err);
            }
        }
    }
    return (
        <div>
            <div className="columns is-centered is-vh-100" id='form-login'>
            <div className="column is-one-third">
                <div className="box" id='form-box'>
                <h1 className="title is-4 has-text-centered ">Login</h1>

                <form>
                    <div className="field">
                    <label className="label ">Email</label>
                    <div className="control">
                        <input className="input" type="email" 
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu email" />
                    </div>
                    </div>

                    <div className="field">
                    <label className="label ">Senha</label>
                    <div className="control">
                        <input className="input" type="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Sua senha" />
                    </div>
                    </div>

                    <div className="field">
                    <div className="control">
                        <button className="button is-primary is-fullwidth" onClick={doLogin}
                        >Entrar</button>
                    </div>
                    </div>
                    <p className="has-text-centered ">
                    Não possui uma conta? <Link to='/register'>Cadastre-se</Link> 
                    </p>
                    <p><Link to='/recovery-passwd'>Esqueceu sua senha?</Link></p>
                </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Login