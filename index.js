import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 3000;

try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error("An error occurred while starting the server:", error);
    process.exit(1);
}

