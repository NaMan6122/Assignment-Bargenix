import fs from "fs";
import path from "path";
import { Coupon } from "../models/coupon.model.js";
import { fileURLToPath } from "url";

// Emulating __dirname.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "data/mockDB.json");

function readDatabase() {
    return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}
  
function writeDatabase(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function getAllCouponsService() {
    const db = readDatabase();
    return db.coupons;
}

function getCouponByIdService(couponId) {
    const db = readDatabase();
    return db.coupons.find((coupon) => coupon.couponCode === couponId);
}

function generateCouponCodeService(productId, userId, discountPercentage) {
    if(!productId || !userId || !discountPercentage) {
        throw new Error("Missing required fields.");
    }

    const newCoupon = new Coupon({
        productId,
        userId,
        discountPercentage,
    });

    const db = readDatabase();
    db.coupons.push(newCoupon);
    writeDatabase(db);

    return newCoupon;
}

export {
    getAllCouponsService,
    getCouponByIdService,
    generateCouponCodeService,
}