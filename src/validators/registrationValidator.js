import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

// Validation pour l'ajout d'une inscription
export const addRegistrationValidator = [
  check("startDate")
    .notEmpty()
    .withMessage("La date de début est requise.")
    .bail()
    .isISO8601()
    .withMessage("La date de début doit être au format valide."),

  check("endDate")
    .notEmpty()
    .withMessage("La date de fin est requise.")
    .bail()
    .isISO8601()
    .withMessage("La date de fin doit être au format valide.")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("La date de fin doit être supérieure à la date de début.");
      }
      return true;
    }),

  check("mount")
    .notEmpty()
    .withMessage("Le montant est requis.")
    .bail()
    .isDecimal()
    .withMessage("Le montant doit être un nombre décimal.")
    .isLength({ min: 1 })
    .withMessage("Le montant doit être supérieur à 0."),

  check("studentId")
    .notEmpty()
    .withMessage("L'identifiant de l'étudiant est requis.")
    .bail()
    .isInt()
    .withMessage("L'identifiant de l'étudiant doit être un nombre entier.")
    .custom(async (value) => {
      const student = await prisma.student.findUnique({ where: { id: value } });
      if (!student) {
        throw new Error("L'étudiant avec cet identifiant n'existe pas.");
      }
      return true;
    }),

  check("moduleId")
    .notEmpty()
    .withMessage("L'identifiant du module est requis.")
    .bail()
    .isInt()
    .withMessage("L'identifiant du module doit être un nombre entier.")
    .custom(async (value) => {
      const module = await prisma.module.findUnique({ where: { id: value } });
      if (!module) {
        throw new Error("Le module avec cet identifiant n'existe pas.");
      }
      return true;
    }),
];

// Validation pour la mise à jour d'une inscription
export const updateRegistrationValidator = [
  check("startDate")
    .optional()
    .isISO8601()
    .withMessage("La date de début doit être au format valide.")
    .bail()
    .custom((value, { req }) => {
      if (value && new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("La date de fin doit être supérieure à la date de début.");
      }
      return true;
    }),

  check("endDate")
    .optional()
    .isISO8601()
    .withMessage("La date de fin doit être au format valide."),
    
  check("mount")
    .optional()
    .isDecimal()
    .withMessage("Le montant doit être un nombre décimal.")
    .isLength({ min: 1 })
    .withMessage("Le montant doit être supérieur à 0."),

  check("studentId")
    .optional()
    .isInt()
    .withMessage("L'identifiant de l'étudiant doit être un nombre entier.")
    .custom(async (value) => {
      const student = await prisma.student.findUnique({ where: { id: value } });
      if (!student) {
        throw new Error("L'étudiant avec cet identifiant n'existe pas.");
      }
      return true;
    }),

  check("moduleId")
    .optional()
    .isInt()
    .withMessage("L'identifiant du module doit être un nombre entier.")
    .custom(async (value) => {
      const module = await prisma.module.findUnique({ where: { id: value } });
      if (!module) {
        throw new Error("Le module avec cet identifiant n'existe pas.");
      }
      return true;
    }),
];

// Validation pour la suppression d'une inscription
export const deleteRegistrationValidator = [
  param("id")
    .isInt()
    .withMessage("L'identifiant de l'inscription doit être un nombre entier.")
    .custom(async (value) => {
      const registration = await prisma.registration.findUnique({ where: { id: value } });
      if (!registration) {
        throw new Error("L'inscription avec cet identifiant n'existe pas.");
      }
      return true;
    }),
];

// Fonction pour vérifier les erreurs de validation
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errors.array(),
    });
  }
  next();
};
