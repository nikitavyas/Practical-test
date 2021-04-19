import * as jwt from "jsonwebtoken";

export const verifyToken = (req:any, res:any, next:any) => {
  console.log(req.headers)
  var token = req.headers['authorization'];
  console.log(token)
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, 'practSec', function(err:any, decoded:any) {
    console.log(err)
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

