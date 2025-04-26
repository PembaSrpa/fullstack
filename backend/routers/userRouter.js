import express from "express";
import {
    getUser,
    postUser,
    getSingleUser,
    deleteUser,
    updateUser,
    checkUserLogin,
} from "../components/user.js";
import { checkUser } from "../middleware/checkUser.js";
const router = express.Router();

router.get("/getUser", getUser);
router.get("/getSingleUser/:id", getSingleUser);
router.post("/postUser", checkUser, postUser);
router.post("/deleteUser/:id", deleteUser);
router.post("/updateUser/:id", updateUser);
router.post("/checkUserLogin", checkUserLogin);

export default router;
