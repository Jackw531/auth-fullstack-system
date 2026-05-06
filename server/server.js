require("dotenv").config();

const express = require("express") //引入express框架-用来写后端API的工具
const cors = require("cors"); //解决跨域问题

const app = express(); //创建一个“后端服务器”

//写“注册接口”（第一步数据流）
const mongoose = require("mongoose"); //数据库
const bcrypt = require("bcryptjs");  //密码加密
//

//写“登录接口”（核心）
const jwt = require("jsonwebtoken");
//

app.use(cors()); //允许跨域（前端可以访问后端）eg.解决前端（5173）访问后端（3000）浏览器会拦截的问题；加了cors后可以访问
app.use(express.json()); //让后端可以读取前端传来的json数据

//测试接口（浏览器访问用）
//即浏览器访问 / -> 返回 “API running”
app.get("/",(req,res)=>{
    res.send("API running");
});

//启动服务器(在http://localhost：3000)
app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
});

//写“注册接口”（第一步数据流）

//连接数据库（先用本地，后面再换Atlas）
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DB connected"))
    .catch(err => console.log(err));

//用户模型
const User = mongoose.model("User", {
    email: String,
    password: String,
});

//注册接口
app.post("/register",async(req,res)=>{
    const{email,password} = req.body;

    //加密密码
    const hashedPassword = await bcrypt.hash(password,10);

    //创建用户
    const user = new User({
        email,
        password: hashedPassword,
    });

    await user.save();

    res.json({ msg : "恭喜注册成功" });
});
//

//写“登录接口”（核心）
app.post("/login",async(req,res) => {
    const {email,password} = req.body;

    //查找用户
    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({msg:"很抱歉用户不存在"});
    }

    //验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({msg:"密码错误"});
    }

    //生成token
    const token = jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET, // 不写死密钥，是为了避免敏感信息暴露，使用环境变量管理配置
        {expiresIn:"7d"}
    );

    res.json({token});
});