import jwt from 'jsonwebtoken'

// Middleware is used for things like
// If user wants to like a post, 
// We use the middleware to verify that the user has the permission
// using its token
// call the next()
// then go to like controller.

const auth = async (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500; // means not a google token.

      let decodedData;

      if (token && isCustomAuth) {
         decodedData = jwt.verify(token, 'test'); // 'test' is the secret. And must be the same name.
         req.userId = decodedData.id;
      } else {
         decodedData = jwt.decode(token);
         req.userId = decodeData.sub;
      }
      next()

   } catch (error) {
      console.log(error)
   }
}

export default auth;