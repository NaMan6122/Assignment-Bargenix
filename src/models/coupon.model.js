import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

class Coupon {
  constructor({productId, userId, discountAmount }) {
    this.id = uuid.v4();
    this.productId = productId;
    this.userId = userId;
    this.expirationDate = dayjs().add(1, "day").toISOString();
    this.discountAmount = discountAmount;
  }
}

export { Coupon };