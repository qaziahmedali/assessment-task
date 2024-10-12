import { genericValidator } from '@/common/genericValidator';
import {
  signupValidationRules,
  loginValidationRules,
} from '@/validations/auth';
import { errorResponseService } from '@/common/services/errorResponseService';
import { successResponseService } from '@/common/services/successResponseService';
import { userRepository } from '@/repository/userRepository';
import bcrypt from 'bcryptjs';
import { authService } from '@/common/services/tokenService';
import { getBody } from '@/common/getBody';

// Helper function to remove sensitive information from user object
const sanitizeUser = (user: any) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

export const userService = {
  register: async (req: Request) => {
    const userData = await getBody(req);

    // Validate body
    const validationError = genericValidator(userData, signupValidationRules);
    if (validationError) {
      return errorResponseService.badRequest(validationError);
    }

    const { name, email, password } = userData;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return errorResponseService.badRequest('User already exists');
    }

    const newUser = await userRepository.create({ name, email, password });

    if (!newUser) {
      return errorResponseService.internalServerError('Failed to create user');
    }

    const token = authService.generateToken(newUser._id.toString());

    return successResponseService.created({
      message: 'User created successfully',
      user: sanitizeUser(newUser),
      token: token,
    });
  },

  login: async (req: Request) => {
    const loginData = await getBody(req);

    // Validate body
    const validationError = genericValidator(loginData, loginValidationRules);
    if (validationError) {
      return errorResponseService.badRequest(validationError);
    }

    const { email, password } = loginData;

    const user = await userRepository.findByEmail(email);
    if (!user) {
      return errorResponseService.unauthorized('User does not exist');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return errorResponseService.unauthorized('Email and password is wrong');
    }

    const token = authService.generateToken(user._id.toString());

    return successResponseService.ok({
      message: 'Login successful',
      user: sanitizeUser(user),
      token: token,
    });
  },
};
