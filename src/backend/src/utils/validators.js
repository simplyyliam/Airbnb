import { body } from 'express-validator';

const registerValidator = [
  body('name').isLength({ min: 2 }).withMessage('Name too short'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
];

const loginValidator = [
  body('email').isEmail(),
  body('password').exists()
];

const accommodationCreateValidator = [
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('location.city').notEmpty(),
  body('location.country').notEmpty(),
  body('pricePerNight').isFloat({ min: 0 })
];

const reservationValidator = [
  body('accommodation').isMongoId(),
  body('startDate').isISO8601(),
  body('endDate').isISO8601()
];

export default {
  registerValidator,
  loginValidator,
  accommodationCreateValidator,
  reservationValidator
};
