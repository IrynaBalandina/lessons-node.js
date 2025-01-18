import { Router } from "express";
import { validateBody } from "../utils/validateBody.js";
import { authRegisterSchema, authLoginSchema, googleOAuthSchema} from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import * as authController from "../controllers/auth.js";

const authRouter = Router();

 authRouter.post("/register", validateBody(authRegisterSchema), ctrlWrapper(authController.registerController));
 authRouter.get("/verify",ctrlWrapper(authController.verifyController));
 authRouter.get("/get-oauth-url", ctrlWrapper(authController.getGoogleOAuthUrlController));
 authRouter.post("/confirm-oauth", validateBody(googleOAuthSchema), ctrlWrapper(authController.loginWithGoogleController));
 authRouter.post("/login",validateBody(authLoginSchema), ctrlWrapper(authController.loginController) );
 authRouter.post("/refresh", ctrlWrapper(authController.refreshTokenController));
 authRouter.post("/logout", ctrlWrapper(authController.logoutController));
export default authRouter;
