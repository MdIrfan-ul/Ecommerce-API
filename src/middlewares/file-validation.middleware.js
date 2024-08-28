import { body, validationResult } from "express-validator";

const addValidationMiddleware = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is Required"),
    body("price").notEmpty().isNumeric().withMessage("Price Must be Number Or Not Empty"),
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is Required");
      }
      return true;
    })
  ];

  await Promise.all(rules.map(rule => rule.run(req)));

  const validationErrors = validationResult(req);

  // displaying the errors to the page
  if (!validationErrors.isEmpty()) {
    return res.status(400).send({ errorMessage: validationErrors.array()[0].msg });
  }

  next();
};

const userValidationMiddleware = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").notEmpty().isEmail().withMessage("Email is Invalid"),
    body("password").notEmpty().isLength({ min: 8, max: 16 }).withMessage("Password Must be 8 to 16 Characters")
  ];

  await Promise.all(rules.map(rule => rule.run(req)));

  const validationErrors = validationResult(req);

  // displaying the errors to the page
  if (!validationErrors.isEmpty()) {
    return res.status(400).send({ errorMessage: validationErrors.array()[0].msg });
  }

  next();
};

const loginValidationMiddleware = async (req, res, next) => {
  const rules = [
    body("email").notEmpty().isEmail().withMessage("Email is Invalid"),
    body("password").notEmpty().isLength({ min: 8, max: 16 }).withMessage("Password Must be 8 Characters")
  ];

  await Promise.all(rules.map(rule => rule.run(req)));

  const validationErrors = validationResult(req);

  // displaying the errors to the page
  if (!validationErrors.isEmpty()) {
    return res.status(400).send({ errorMessage: validationErrors.array()[0].msg });
  }

  next();
};

export { addValidationMiddleware, userValidationMiddleware, loginValidationMiddleware };
