import { check, param, body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

// Validation pour l'ajout d'un paiement
export const addPaymentValidator = [
  check("amount")
    .isDecimal({ decimal_digits: '2' })
    .withMessage("Le montant doit être un nombre décimal avec 2 chiffres après la virgule."),
  check("paymentDate")
    .isDate()
    .withMessage("La date de paiement doit être une date valide."),
  check("studentId")
    .isInt()
    .withMessage("L'ID de l'étudiant doit être un nombre entier.")
    .custom(async (value) => {
      const student = await prisma.student.findUnique({ where: { id: value } });
      if (!student) {
        return Promise.reject("L'étudiant n'existe pas.");
      }
    }),
  check("moduleId")
    .isInt()
    .withMessage("L'ID du module doit être un nombre entier.")
    .custom(async (value) => {
      const module = await prisma.module.findUnique({ where: { id: value } });
      if (!module) {
        return Promise.reject("Le module n'existe pas.");
      }
    })
];

// Validation pour la mise à jour d'un paiement
export const updatePaymentValidator = [
  check("amount")
    .optional()
    .isDecimal({ decimal_digits: '2' })
    .withMessage("Le montant doit être un nombre décimal avec 2 chiffres après la virgule."),
  check("paymentDate")
    .optional()
    .isDate()
    .withMessage("La date de paiement doit être une date valide."),
  check("studentId")
    .optional()
    .isInt()
    .withMessage("L'ID de l'étudiant doit être un nombre entier."),
  check("moduleId")
    .optional()
    .isInt()
    .withMessage("L'ID du module doit être un nombre entier.")
];

// Validation pour la suppression d'un paiement
export const deletePaymentValidator = [
  param("id")
    .isInt()
    .withMessage("L'ID du paiement doit être un nombre entier.")
    .custom(async (value) => {
      const payment = await prisma.payment.findUnique({ where: { id: parseInt(value) } });
      if (!payment) {
        return Promise.reject("Le paiement n'existe pas.");
      }
    })
];
