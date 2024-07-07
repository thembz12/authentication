const express = require ("express")

const {registerUser,allUsers,SignOutUser,loginUser } = require ("../controller/controller.js")
const Auth = require ("../middleware/userAuth.js")
const router = express.Router()

router.post("/users/signUp", registerUser )
router.post("/users/in",loginUser  )
router.post("/users/out", SignOutUser  )
router.get("/users/allusers", Auth, allUsers  )

module.exports = router 