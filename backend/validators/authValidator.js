// validators/authValidators.js
import Joi from 'joi';

export const signupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      'string.empty': 'Name is required',
      'string.min': 'Name should be at least 3 characters'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be valid',
      'string.empty': 'Email is required'
    }),
    password: Joi.string().min(6).max(255).required().messages({
      'string.min': 'Password must be at least 6 characters'
    }),
    contact: Joi.string().optional().allow('').messages({
      'string.base': 'Contact must be a string'
    }),
    address: Joi.string().optional().allow(''),
    role: Joi.string().valid("user", "admin").optional()
  });

  return schema.validate(data, { abortEarly: false }); // shows all errors, not just the first
};
