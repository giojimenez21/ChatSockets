import { Router } from "express";
import { check } from "express-validator";
import { createUserOrLogin, renewToken } from "../controllers/auth.controller";
import { validate_fields } from "../helpers/validate_fields";
import { validateJWT } from "../middlewares/validate_jwt";

const router: Router = Router();

// Create user with google token
router.post(
    "/newUserOrLogin",
    [check("google_token").notEmpty(), validate_fields],
    createUserOrLogin
);

// Renew Token
router.get('/renew',validateJWT, renewToken);

export default router;
