import jwt from 'jsonwebtoken'


export const middleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if(!auth) return res.status(401);
    
    const token = auth.replace('Bearer ', '');
    
    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
        if(err) return res.status(401);
        return req.baseUrl = decoded.accessToken; //pra ter acesso apenas com token do próprio user
    });
        
    next()
}