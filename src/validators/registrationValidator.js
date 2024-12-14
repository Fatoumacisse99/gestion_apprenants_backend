import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

// Validation pour l'ajout d'une inscription
export const addRegistrationValidator = [
  check("startDate")
    .notEmpty()
    .withMessage("La date de début est requise.")
    .bail()
    .custom((startDate) => {
      const parsedStartDate = new Date(startDate);
      if (isNaN(parsedStartDate)) {
        throw new Error("La date de début doit être une date valide.");
      }
      return true;
    }),

  check("endDate")
    .notEmpty()
    .withMessage("La date de fin est requise.")
    .bail()
    .custom((endDate, { req }) => {
      const parsedEndDate = new Date(endDate);
      if (isNaN(parsedEndDate)) {
        throw new Error("La date de fin doit être une date valide.");
      }

      const parsedStartDate = new Date(req.body.startDate);
      if (parsedEndDate <= parsedStartDate) {
        throw new Error("La date de fin doit être après la date de début.");
      }
      return true;
    }),

  check("mount")
    .notEmpty()
    .withMessage("Le montant est requis.")
    .bail()
    .isFloat({ min: 0.01 })
    .withMessage("Le montant doit être supérieur à 0.")
    .bail(),

  check("studentId")
    .notEmpty()
    .withMessage("L'ID de l'étudiant est requis.")
    .bail()
    .custom(async (id) => {
      const student = await prisma.student.findUnique({ where: { id: Number(id) } });
      if (!student) {
        throw new Error("L'étudiant spécifié n'existe pas.");
      }
      return true;
    }),

  check("moduleId")
    .notEmpty()
    .withMessage("L'ID du module est requis.")
    .bail()
    .custom(async (id) => {
      const module = await prisma.module.findUnique({ where: { id: Number(id) } });
      if (!module) {
        throw new Error("Le module spécifié n'existe pas.");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];
export const updateRegistrationValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID de l'inscription est requis.")
    .bail()
    .custom(async (id) => {
      const registration = await prisma.registration.findUnique({ where: { id: Number(id) } });
      if (!registration) {
        throw new Error("L'inscription spécifiée n'existe pas.");
      }
      return true;
    }),

  check("startDate")
    .optional()
    .custom((startDate) => {
      const parsedStartDate = new Date(startDate);
      if (isNaN(parsedStartDate)) {
        throw new Error("La date de début doit être une date valide.");
      }
      return true;
    }),

  check("endDate")
    .optional()
    .custom((endDate, { req }) => {
      const parsedEndDate = new Date(endDate);
      if (isNaN(parsedEndDate)) {
        throw new Error("La date de fin doit être une date valide.");
      }

      const parsedStartDate = new Date(req.body.startDate);
      if (parsedEndDate <= parsedStartDate) {
        throw new Error("La date de fin doit être après la date de début.");
      }
      return true;
    }),

  check("mount")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("Le montant doit être supérieur à 0.")
    .bail(),

  check("studentId")
    .optional()
    .custom(async (id) => {
      const student = await prisma.student.findUnique({ where: { id: Number(id) } });
      if (!student) {
        throw new Error("L'étudiant spécifié n'existe pas.");
      }
      return true;
    }),

  check("moduleId")
    .optional()
    .custom(async (id) => {
      const module = await prisma.module.findUnique({ where: { id: Number(id) } });
      if (!module) {
        throw new Error("Le module spécifié n'existe pas.");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

export const deleteRegistrationValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID de l'inscription est requis.")
    .bail()
    .custom(async (id) => {
      const registration = await prisma.registration.findUnique({ where: { id: Number(id) } });
      if (!registration) {
        throw new Error("L'inscription spécifiée n'existe pas.");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

export const getRegistrationValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID de l'inscription est requis.")
    .bail()
    .custom(async (id) => {
      const registration = await prisma.registration.findUnique({ where: { id: Number(id) } });
      if (!registration) {
        throw new Error("L'inscription spécifiée n'existe pas.");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];
