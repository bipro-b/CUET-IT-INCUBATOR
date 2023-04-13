const { signUpService, findUserService } = require("../services/userService");
const {generateToken} = require("../utils/token")
exports.signUp = async (req, res, next) => {
  try {
    const user =await signUpService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully signed up",
      user
    });
  } catch (error) {
    res.status(500).json({
      status: "Fails",
      message: "Fails to  signup",
      error: error.message,
    });
  }
};
/* 
1. Email and pass checking
2. load user data
3. If not user res
4. compare pass
5. If pass not matched send res
6. generate token 
7. send user 
*/
exports.logIn = async(req,res,next)=>{
    try {
        const {email,password} = req.body;


        if(!email || !password){
            return res.status(401).json({
                status:"Fail",
                error:"Email or password is not found.",
            })
        }

        const user = await findUserService(email)
        
        if(!user){
            return res.status(401).json({
                status:"Fail",
                error:"User is not found.",
            })
        }
     
        const isPasswordValid = user.comparePassword(password,user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                status:"Fail",
                error:"Password is wrong.",
            })
        }

        const token = generateToken(user);

        const {password:pwd,  ...others} = user.toObject();

        res.status(200).json({
          status: "Success",
          message: "Successfully signed up",
          data:{
            others,
            token
          }
        });
      } catch (error) {
        res.status(500).json({
          status: "Fails",
          message: "Fails to  signup",
          error: error.message,
        });
      }
}
exports.getMe = async(req,res)=>{
  try {

      const user = req.user;
      res.json(user);
      
  } catch (error) {
      res.status(403).json({
          status: "Fails",
          message: "Fails to  login",
          error: error.message,
        });
      
  }
}