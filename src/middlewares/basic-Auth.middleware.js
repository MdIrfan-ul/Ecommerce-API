import UserModel from "../features/users/models/user.model.js";

const basicAuthorizer = (req,res,next)=>{

    const authHeader = req.headers["authorization"];
    if(!authHeader){
        res.status(401).send("UnAuthorized Access");
    }
    console.log(authHeader);

    const basic64Credentials = authHeader.replace('Basic',' ');
    console.log(basic64Credentials);

    const decodeCreds = Buffer.from(basic64Credentials,'base64').toString('utf8');
    console.log(decodeCreds);

    const creds= decodeCreds.split(':');
    const user = UserModel.getAll().find(u=>u.email == creds[0]&& u.password==creds[1]);
    if(user){
        next();
    }else{
        res.status(401).send("Incorrect Credentials");
    }
}

export default basicAuthorizer;