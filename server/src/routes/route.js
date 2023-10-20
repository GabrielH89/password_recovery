const {registerUser, loginUser} = require('../controller/userController');
const {solicitarRecuperacaoSenha, redefinirSenha} = require('../controller/recoveryController');
const express = require('express');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/recovery-password/solicitar', solicitarRecuperacaoSenha);
router.post('/recovery-password/redefinir', redefinirSenha);


module.exports = router;