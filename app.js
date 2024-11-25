import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: "500kb",
}));

app.use(express.urlencoded({
    limit: "500kb",
    extended: true,
}));

//routes:
import couponRouter from "./src/routes/coupon.routes.js";
app.use("/api/v1/coupon", couponRouter);


export { app }