import { asyncHandler } from "../helpers/AsyncHandler.js";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { ApiError } from "../helpers/ApiError.js";
import { getAllCouponsService } from "../services/coupon.service.js";
import { getCouponByIdService } from "../services/coupon.service.js";
import { generateCouponCodeService } from "../services/coupon.service.js";
import { isValid } from "../validators/coupon.validator.js";
import { isExpired } from "../validators/coupon.validator.js";

export const getAllCoupons = asyncHandler( async(req, res) => {
    const allCoupons = getAllCouponsService();
    if(!allCoupons) throw new ApiError(404, "No coupons found or database is empty.");

    res.status(200).json(new ApiResponse(200, allCoupons));
});

export const getCouponById = asyncHandler( async(req, res) => {
    const couponId = req.params.id;
    if(!couponId) throw new ApiError(400, "Coupon ID is required.");

    const isCouponValid = isValid(couponId);
    if(!isCouponValid) throw new ApiError(400, "Invalid coupon ID.");

    const coupon = getCouponByIdService(couponId);

    const isCouponExpired = isExpired(coupon.expirationDate);
    if(isCouponExpired) throw new ApiError(400, "Coupon has been expired.");

    res.status(200).json(new ApiResponse(200, coupon));
});

export const createCoupon = asyncHandler( async(req, res) => {
    const { productId, userId, discountPercentage } = req.body;
    if(!productId || !userId || !discountPercentage) throw new ApiError(400, "Missing required fields.");

    const newCoupon = generateCouponCodeService(productId, userId, discountPercentage);
    if(!newCoupon) throw new ApiError(500, "Failed to generate coupon code.");

    res.status(201).json(new ApiResponse(201, newCoupon));
});