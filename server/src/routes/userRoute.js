import { Router } from "express";
import { signup,login,logout,allUsers,getCurrentUser } from "../controllers/userController.js";
import secureRoute from "../middleware/secureRoute.js";

const router = Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);
router.get('/current-user',secureRoute ,getCurrentUser )


export default router