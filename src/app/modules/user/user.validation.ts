import { z, ZodError } from 'zod';
import { IUser } from './user.interface';

// Validation schema for full name
const fullNameValidation = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

// Validation schema for address
const addressValidation = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

// Validation schema for order
const orderValidation = z.object({
  productName: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

// Validation schema for user
export const userValidation = z.object({
  userId: z.number().min(1),
  userName: z.string().min(1),
  password: z.string().min(1),
  fullName: fullNameValidation,
  age: z.number().min(1),
  email: z.string().email(),
  isActivate: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: addressValidation,
  orders: z.array(orderValidation).optional(),
});

// Validation function for validating user data
export function validateUser(data: unknown): IUser {
  try {
    return userValidation.parse(data) as IUser;
  } catch (error) {
    if (error instanceof ZodError) {
      // Handle validation errors, log them, or throw a custom error.
      throw new Error(`Validation failed: ${error.message}`);
    }
    throw error;
  }
}
