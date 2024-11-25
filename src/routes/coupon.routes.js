import { Router } from "express"
import { getAllCoupons, getCouponById, createCoupon } from "../controllers/coupon.controller.js";

const router = Router();

router.route("/get-all-coupons").get(getAllCoupons);
router.route("/get-coupon/:id").get(getCouponById);
router.route("/create-coupon").post(createCoupon);

export default router;