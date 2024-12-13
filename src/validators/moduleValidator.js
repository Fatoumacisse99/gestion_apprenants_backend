import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

// Validation pour l'ajout d'un module
export const addModuleValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom du module est requis.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom du module doit contenir entre 2 et 50 caractères."),
  check("duration")
    .isInt({ min: 1 })
    .withMessage("La durée doit être un nombre entier positif."),
  check("price")
    .isDecimal({ decimal_digits: '2' })
    .withMessage("Le prix doit être un nombre décimal avec 2 chiffres après la virgule."),
  check("status")
    .isBoolean()
    .withMessage("Le statut doit être un booléen (true ou false).")
];

// Validation pour la mise à jour d'un module
export const updateModuleValidator = [
  check("name")
    .trim()
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom du module doit contenir entre 2 et 50 caractères."),
  check("duration")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La durée doit être un nombre entier positif."),
  check("price")
    .optional()
    .isDecimal({ decimal_digits: '2' })
    .withMessage("Le prix doit être un nombre décimal avec 2 chiffres après la virgule."),
  check("status")
    .optional()
    .isBoolean()
    .withMessage("Le statut doit être un booléen (true ou false).")
];

// Validation pour la suppression d'un module
export const deleteModuleValidator = [
  param("id")
    .isInt()
    .withMessage("L'ID du module doit être un nombre entier.")
    .custom(async (value) => {
      const module = await prisma.module.findUnique({ where: { id: parseInt(value) } });
      if (!module) {
        return Promise.reject("Le module n'existe pas.");
      }
    })
];
