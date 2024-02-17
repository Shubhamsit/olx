var express = require("express");
var app_express = express();
const session = require("express-session");
const flash = require("connect-flash");
var router = express.Router();
const bodyParser = require("body-parser");
app_express.use(bodyParser.json());
const userModel = require("../models/users");
const issueModel = require("../models/issue");
const muncipality_userModel = require("../models/muncipality_user");
let x;
let k;
let pincodePromise;

//-----------------------------------------------------------------------------------------------------------
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("welcome to pinterest");
});
//-----------------------------------------------------------------------------------------------------------

router.get("/register", function (req, res, next) {
  res.render("index", { myerror: "" });
});
//----------------------------------------------------------------------------------------------------------

router.get("/login", function (req, res, next) {
  res.render("loginpage", { error: "" });
});
//-----------------------------------------------------------------------------------------------------------
router.get("/munlogin", function (req, res, next) {
  res.render("muncipality_login", { error: "" });
});
//-----------------------------------------------------------------------------------------------------
router.get("/issue", async function (req, res) {
  res.render("issue");
});

//-------------------------------------------------------------------------------------------------------------

router.get("/profile/:userid/issue", async function (req, res) {
  const userid = req.params.userid;
  console.log("userid", userid);
  res.render("issue");
});
//-----------------------------------------------------------------------------------------------------------

router.get("/profile/:userid/userissue", async function (req, res) {
  const userid = req.params.userid;
  const user = await userModel.findOne({ _id: userid });
  const username = user.username;
  console.log("userid", userid);
  res.render("userissue", { username });
});
//------------------------------------------------
router.get("/profile/:userid/pincodeissue", async function (req, res) {
  res.render("pincode_issue");
});
//--------------------------------------------------------------------------------------------------------
router.get("/muncipality/:munid", async function (req, res) {
  const id = req.params.munid;
  let user = await muncipality_userModel.findOne({ _id: id });
  const mun_name = user.name;
  res.render("muncipality", { mun_name });
});
//------------------------------------------------------------------------------------------------------
router.get('/district',function(req,res){
  res.render('district');
})
//------------------------------------------------------------------------------------------------------

router.get("/profile/:userid", async function (req, res) {
  const userid = req.params.userid;
  const user = await userModel.findOne({ _id: userid });
  x = { id: userid };
  if (user) {
    res.render("profile", {
      user_email: user.email,
      user_fullname: user.fullname,
      user_username: user.username,
      user_pincode: user.pincode,
      x,
    });
  }
});
//-------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------
// register new user in database
router.post("/register", async function (req, res, next) {
  try {
    const myuser = new userModel({
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      pincode: req.body.pincode,
    });
    console.log(myuser);
    const registered = await myuser.save();
    res.redirect("/login");
  } catch (error) {
    const myerror = "enter all credentials to register";
    res.render("index", { myerror });
    console.log(error);
  }
});

//--------------------------------------------------------------------------------------------------------------

router.post("/login", async function (req, res) {
  console.log("testing", req.body);
  const loginemail = req.body.email;
  const loginpass = req.body.password;
  let user = await userModel.findOne({ email: loginemail });

  if (user) {
    if (user.password === loginpass) {
      res.redirect(`/profile/${user._id}`);
    } else {
      const error = "Invalid credentials. Please enter a valid password.";
      res.render("loginpage", { error });
    }
  } else {
    const error = "please enter cedentials";
    res.render("loginpage", { error });
  }
});
//-----------------------------------------------------------------------------------------------------------
router.post("/munlogin", async function (req, res) {
  console.log("testing", req.body);
  const loginuserid = req.body.userid;
  const loginpass = req.body.password;
  let user = await muncipality_userModel.findOne({ userid: loginuserid });
  console.log(user);

  if (user) {
    if (user.password === loginpass) {
      console.log(user);
      pincodePromise = Promise.resolve(user.pincodes);
      console.log(await pincodePromise);
      res.redirect(`/muncipality/${user._id}`);
    } else {
      const error = "Invalid credentials. Please enter a valid password.";
      res.render("munloginpage", { error });
    }
  } else {
    const error = "please enter cedentials";
    res.render("munloginpage", { error });
  }
});

//-------------------------------------------------------------------------------------------------------
// getting complaint page data and save it in database
router.post("/profile/issue", async function (req, res, next) {
  try {
    id = x.id;
    console.log(id);
    console.log(typeof id); //// type of id is String
    console.log(req.body);
    const userissue = new issueModel({
      category: req.body.category,
      state: req.body.state,
      district: req.body.district,
      pincode: req.body.pincode,
      problem: req.body.problem,
      suggestion: req.body.suggestion,
      landmark: req.body.landmark,
      userid: id,
    });
    await userissue.save();
    res.redirect(`/profile/${x.id}`);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------------------------------------------------
//   --------------   API's---------------------------------------------------------------------------------
// API endpoint to get complaints data
router.get("/api/userissue", async (req, res) => {
  let issue_user = await issueModel.find({ userid: x.id });
  console.log(issue_user);
  console.log(x.id);
  console.log(typeof x.id);
  res.json(issue_user);
});

//------------------------------------------------------------------------------------------------------------
router.post("/api/pincode_issue", async (req, res) => {
  const selectedpincode = req.body.pincode;
  let issue_pincode = await issueModel.find({ pincode: selectedpincode });
  console.log(issue_pincode);
  res.json(issue_pincode);
});

//-------------------------------------------------------------------------------------------------------------
router.post("/api/category_muncipality", async (req, res) => {
  try {
    const category = req.body.category;
    const issue_category = await issueModel.find({ category: category });
    res.status(200).json(issue_category);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//----------------------------------------------------------------------------------------------------
router.post("/api/pincode_muncipality", async (req, res) => {
  try {
    const pincodevalue = req.body.pincode;
    const issue_pincode = await issueModel.find({ pincode: pincodevalue });
    res.status(200).json(issue_pincode);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//----------------------------------------------------------------------------------------------
router.get("/api/retrieve_mun_pincodes", async (req, res) => {
  const pincode = await pincodePromise;

  try {
    res.status(200).json(pincode);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
