import { useState } from 'react';
import axios from 'axios';

function RecoveryPasswd() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Novo estado para armazenar mensagens de erro

    const sendEmail = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("email", email);
            if (email.trim().length > 0) {
                await axios.post("http://localhost:4000/recovery-password/solicitar", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                // Se a solicitação foi bem-sucedida, redefina a mensagem de erro
                setErrorMessage("E-mail enviado com sucesso para " + email);
            } else {
                alert("Preencha o campo de e-mail");
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setErrorMessage("Email não encontrado");
            } else {
                console.log("Error: " + err);
            }
        }
    }

    return (
        <div>
            <form>
                <input
                    placeholder='Insert your e-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </input>
                <button onClick={sendEmail}>Enviar E-mail</button>
                {errorMessage && <p>{errorMessage}</p>} {/* Exibe a mensagem de erro, se houver */}
            </form>
        </div>
    )
}

export default RecoveryPasswd;
