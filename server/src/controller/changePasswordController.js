const userModel = require('../model/userModel');

const changePassword = async (req, res) => {
    try{
        const {token, newPassword} = req.body;
        const user = await userModel.findOne({where: { passwordResetToken: token } })
    }catch(err){
        return res.status(500).json({msg: "Ocurred this error " + err});
    }
}

module.exports = changePassword;