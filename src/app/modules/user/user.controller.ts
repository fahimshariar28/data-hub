import { Request, Response } from 'express';
import {
  addOrderService,
  calculateTotalPriceService,
  createUserService,
  deleteUserService,
  getAllUsersService,
  getOrdersService,
  getUserByIdService,
  updateUserService,
} from './user.service';
import { validateUser } from './user.validation';

// Controller function for creating a new user
export const createUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get the user data from the request body
    const user = req.body;

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

// Controller function for getting all users
export const getAllUsersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get all users using the service function
    const users = await getAllUsersService();

    // Send the response
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    });
  } catch (error: any) {
    // Handle errors, send an appropriate response
    res.status(400).json({
      success: false,
      message: 'Failed to fetch users!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

// Controller function for getting a user by id
export const getUserByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get the user id from the request params
    const { userId } = req.params;

    // Get the user using the service function
    const user = await getUserByIdService(userId);

    // Send the response
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error: any) {
    // Handle errors, send an appropriate response
    res.status(400).json({
      success: false,
      message: 'Failed to fetch user!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

// Controller function for updating a user by userId
export const updateUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get the user id from the request params
    const { userId } = req.params;

    // Get the user data from the request body
    const userData = req.body;

    // Validate the incoming user data
    const validatedUser = validateUser(userData);

    // Update the user using the service function
    const updatedUser = await updateUserService(userId, validatedUser);

    // Send the response
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    });
  } catch (error: any) {
    // Handle errors, send an appropriate response
    res.status(400).json({
      success: false,
      message: 'Failed to fetch user!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

// Controller function for deleting a user by userId
export const deleteUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get the user id from the request params
    const { userId } = req.params;

    // Get the user using the service function
    await deleteUserService(userId);

    // Send the response
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    // Handle errors, send an appropriate response
    res.status(400).json({
      success: false,
      message: 'Failed to fetch user!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

// Controller function for adding an order to a user
export const addOrderController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get the user id from the request params
    const { userId } = req.params;

    // Get the order data from the request body
    const orderData = req.body;

    // Add the order to the user using the service function
    await addOrderService(userId, orderData);

    // Send the response
    res.status(200).json({
      success: true,
      message: 'Order added successfully!',
      data: null,
    });
  } catch (error: any) {
    // Handle errors, send an appropriate response
    res.status(400).json({
      success: false,
      message: 'Failed to add order!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

// Controller function for getting orders of a user
export const getOrdersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get the user id from the request params
    const { userId } = req.params;

    // Get the orders of the user using the service function
    const orders = await getOrdersService(userId);

    // Send the response
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: { orders },
    });
  } catch (error: any) {
    // Handle errors, send an appropriate response
    res.status(400).json({
      success: false,
      message: 'Failed to fetch orders!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};

// Controller function for calculating the total price of orders of a user
export const calculateTotalPriceController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get the user id from the request params
    const { userId } = req.params;

    // Get the orders of the user using the service function
    const totalPrice = await calculateTotalPriceService(userId);

    // Send the response
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: totalPrice.toFixed(2),
      },
    });
  } catch (error: any) {
    // Handle errors, send an appropriate response
    res.status(400).json({
      success: false,
      message: 'Failed to calculate total price!',
      error: {
        code: 400,
        description: error.message,
      },
    });
  }
};
