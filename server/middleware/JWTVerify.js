const jwt=require("jsonwebtoken");

module.exports.
JWTVerify=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    if(!authHeader) return res.status('fail');
    const token=authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.send(err);
            req.user=decoded.userDetails.username
            next();
        }
    )
}