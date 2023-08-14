const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(
    async(req,res,next)=>{
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        console.log(authHeader);
        if(authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_KEY, (err, decoded)=>{
                console.log(err);
                if(err){
                    res.status(401);
                    throw new Error("User is not authorized");

                }
                req.user = decoded.user;
                console.log(decoded);
                next();
            })
        }
        // else{
        //     res.status(401);
        //     throw new Error("User is not authorized");
        // }
        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or Token is missing");
            
        }
    }
)

module.exports = validateToken;