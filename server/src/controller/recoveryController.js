const userModel = require('../model/userModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function generatePasswordResetToken() {
    // Gere um token aleatório usando criptografia segura
    const token = crypto.randomBytes(32).toString('hex');
    return token;
  }

const sendPasswordResetEmail = async (email, token) => {
    try {
        const resetLink = `http://localhost:4000/recovery-password/redefinir?token=${token}`;
        const reset2 = 'http://localhost:4000/recovery-password/redefinir'; 
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Exemplo: 'Gmail'
            auth: {
                user: 'gabrielhenriquegh3878@gmail.com',
                pass: 'snlfpybbkrweqtyx',
            },
        });
        const mailOptions = {
            from: 'Gabriel <gabrielhenriquegh3878@gmail.com>',
            to: email,
            subject: 'Recuperação de Senha',
            text: `Clique no link a seguir para redefinir sua senha: ${resetLink}`,
        };
        
        // Enviar o email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar o email:', error);
            } else {
                console.log('E-mail enviado com sucesso:', info.response);
            }
        });
    } catch (err) {
        console.error('Ocorreu um erro ao enviar o email de recuperação de senha:', err);
    }
}

const solicitarRecuperacaoSenha = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Verificar se o email fornecido existe no banco de dados
      const user = await userModel.findOne({ where: { email: email } });
  
      if (!user) {
        return res.status(404).json({ msg: "Email não encontrado" });
      }
  
      // Gere um token de recuperação de senha
      const token = generatePasswordResetToken();
  
      // Salve o token no registro do usuário (por exemplo, no banco de dados)
      user.passwordResetToken = token;
      await user.save();
  
      // Envie um email com um link contendo o token para redefinir a senha
      sendPasswordResetEmail(user.email, token);
  
      res.status(200).json({ msg: "Um email com instruções para redefinir a senha foi enviado." });
    } catch (err) {
      console.error('Ocorreu um erro ao solicitar a recuperação de senha:', err);
      res.status(500).json({ msg: "Ocorreu um erro ao solicitar a recuperação de senha." });
    }
  };
  
  const redefinirSenha = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      // Verificar se o token é válido e se ainda não expirou
      /*const user = await userModel.findOne({ where: { passwordResetToken: token } });
      
      if (!user) {
        return res.status(400).json({ msg: "Token de recuperação de senha inválido ou expirado" });
      }*/

      const user = await userModel.findOne({
        where: {
          email: email
        }
      }) 

      if(!user){
        return res.status(400).json({msg: "Please, insert a valid e-mail"});
      }
      // Atualize a senha do usuário com a nova senha
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.passwordResetToken = null; // Limpe o token de recuperação
      await user.save();
  
      res.status(200).json({ msg: "Senha redefinida com sucesso" });
    } catch (err) {
      console.error('Ocorreu um erro ao redefinir a senha:', err);
      res.status(500).json({ msg: "Ocorreu um erro ao redefinir a senha." + err });
    }
  };

module.exports = {solicitarRecuperacaoSenha, redefinirSenha};

