import { Router } from "express";
import RegistrationController from "../controllers/RegistrationController.js";
import {
  addRequestValidator,
  updateRequestValidator,
  deleteRequestValidator,
} from "../validators/registrationValidator.js";

const router = Router();
router.post("/registration", addRequestValidator, RegistrationController.createRegistration);
router.get("/registrations", RegistrationController.getAllRegistrations);
router.get("/registration/:id", RegistrationController.getByIdRegistration);
router.put("/registration/:id", updateRequestValidator, RegistrationController.updateRegistration);
router.delete("/registration/:id", deleteRequestValidator, RegistrationController.deleteRegistration);

export default router;
