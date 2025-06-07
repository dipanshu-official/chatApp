import { Router } from "express";
import { signup,login,logout,allUsers } from "../controllers/userController.js";
import secureRoute from "../middleware/secureRoute.js";

const router = Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);


export default router