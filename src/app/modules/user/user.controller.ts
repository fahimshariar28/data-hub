import { Request, Response } from 'express';
import { createUserService } from './user.service';
import { validateUser } from './user.validation';

// Controller function for creating a new user
export const createUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get the user data from the request body
    const user = req.body;
    console.log(req);

    //   Check if the user.hobbies is an array. If not, make it an array.
    if (!Array.isArray(user.hobbies)) {
      user.hobbies = [user.hobbies];
    }

    // Validate the incoming user data
    const validatedUser = validateUser(user);

    // Create the user using the service function
    const newUser = await createUserService(validatedUser);

    // Send the response
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: newUser,
    });
  } catch (error: any) {
    // Handle errors, send an appropriate response
    res.status(400).json({
      success: false,
      message: 'Failed to create user!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};