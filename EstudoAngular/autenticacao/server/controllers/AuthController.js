const UserModel = require('../models/UserModel')
const bcript = require('bcryptjs')
const consts = require('../consts')
var jwt = require('jsonwebtoken');

module.exports = {
    register: async function (req, res) {
        try {
            let u = await UserModel.findOne({ email: req.body.email });
            if (!u) {
                const user = new UserModel(req.body);
                user.password = bcript.hashSync(req.body.password, consts.bcryptSalts);
                await user.save();
                delete user.password
                res.status(200).json(user);
            }
            else {
                res.status(403).json({ message: 'Email already register', error: {} });
            }
        } catch (e) {
            res.status(500).json({ message: 'Email already register', error: e });
        }
    },
    login: function (req, res) {
        const password = req.body.password;
        const email = req.body.email;

        UserModel.findOne({ email: email }).lean().exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: "server error", error: err
                })
            }
            const auth_err = (password == '' || password == null || !user);
            if (!auth_err) {
                if (bcript.compareSync(password, user.password)) {
                    let token = jwt.sign({ _id: user._id }, consts.keyJWT, { expiresIn: consts.expiresJWT })
                    delete user.password
                    return res.status(200).json({ ...user, token: token });
                }
            }
            return res.status(500).json({
                message: "Erro no password ou Email.", error: err
            })
        })
    },
    check_token: function (req, res, next) {
        const token = req.get('Authorization');      
        if (!token) {
            return res.status(401).json({ message: 'Token not found' })
        }
        jwt.verify(token, consts.keyJWT, () => {            
            (err, decoded) => {               
                if (err || !decoded) {                   
                    return res.status(401).json({ message: 'Wrong token' })
                }             
            }           
            next();
        })
     
    }
}