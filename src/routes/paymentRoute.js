import { Router } from "express";
import PaymentController from "../controllers/PaymentController.js";
import {
  addRequestValidator,
  updateRequestValidator,
  deleteRequestValidator,
} from "../validators/paymentValidator.js";

const router = Router();
router.post("/payment", addRequestValidator, PaymentController.createPayment);
router.get("/payments", PaymentController.getAllPayments);
router.get("/payment/:id", PaymentController.getByIdPayment);
router.put("/payment/:id", updateRequestValidator, PaymentController.updatePayment);
router.delete("/payment/:id", deleteRequestValidator, PaymentController.deletePayment);

export default router;
