const jwt = require('jsonwebtoken');

const CheckToken = roles => {
return(req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(403).json({ message: 'you Are not authorized' });
    }
    const token = bearerToken.split(' ')[1];
    console.log(token);

    const secretKey = 'bsbdfjsufikjsfuhuisjhsfjksfjgfdjdfjhgsd';
    const decoded = jwt.verify(token, secretKey);
    if(!roles.includes(decoded.role)){
      return res.status(403).json({ message: 'You are not authorised' });
    }
    next();
  } catch (e) {
    return res.status(403).json({ message: 'You are not authorised' });
  }
};
}

module.exports = CheckToken;
