import { Router } from "express";
import hospitalRouter from "./hospitals.js";
import userRouter from "./user.js";
// import requestRouter from "./request.js";
import appointmentRotuter from "./appointments.js";
import itemRouter from "./items.js";
const router = Router();

router.use("/hospital", hospitalRouter);
router.use("/user", userRouter);
// router.use("/request", requestRouter);
router.use("/appointment", appointmentRotuter);
router.use("/items", itemRouter);

export default router;
