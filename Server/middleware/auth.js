const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    const token = req.header("x-auth-token");

    if(!token) return res.status(401).send("Acesso Negado");

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = jwt.verify(token, secretKey);

        req.user = user;

        next()
    } catch (error) {
        res.status(400).send("Acesso Negado");
    }
};

const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).send("Acesso Negado");
        }
    });
};

const isUser = (req, res, next) => {
    auth(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).send("acesos negado");
        }
    });
};

module.exports = {auth, isAdmin, isUser};