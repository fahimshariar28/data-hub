import { IUser, TOrder } from './user.interface';
import { User } from './user.model';

// Service function to create a new user
export async function createUserService(userData: IUser): Promise<IUser> {
  // Check if the user already exists
  const existingUser = await User.isUserExist(userData.userId);
  if (existingUser) {
    // Throw an error if the user already exists
    throw new Error('User already exists!');
  } else {
    // Create the user using the mongoose model if the user does not exist
    const newUser = await User.create(userData);
    return newUser;
  }
}

// Service function to get all users
export async function getAllUsersService(): Promise<IUser[]> {
  // Get all users using the mongoose model
  const users = await User.find();
  return users;
}

// Service function to get a user by id
export async function getUserByIdService(
  userId: string,
): Promise<IUser | null> {
  const user = await User.findOne({ userId: userId });
  return user;
}

// Service function to update a user by id
export async function updateUserService(
  userId: string,
  userData: IUser,
): Promise<IUser | null> {
  const updatedUser = await User.findOneAndUpdate(
    { userId: userId },
    userData,
    { new: true },
  );
  return updatedUser;
}

// Service function to delete a user by id
export async function deleteUserService(userId: string): Promise<IUser | null> {
  const deletedUser = await User.findOneAndDelete({ userId: userId });
  return deletedUser;
}

// Service function to add an order to a user
export async function addOrderService(
  userId: string,
  orderData: TOrder,
): Promise<IUser | null> {
  const updatedUser = await User.findOneAndUpdate(
    { userId: userId },
    { $push: { orders: orderData } },
    { new: true },
  );
  return updatedUser;
}

// Service function to get orders of a user
export async function getOrdersService(
  userId: string,
): Promise<TOrder[] | null> {
  const user = await User.findOne({ userId: userId });
  return user?.orders || null;
}

// Calculate the total price of the orders of a user
export async function calculateTotalPriceService(
  userId: string,
): Promise<number> {
  const user = await User.findOne({ userId: userId });
  const totalPrice = user?.orders?.reduce((acc, order) => {
    return acc + order.price * order.quantity;
  }, 0);
  return totalPrice || 0;
}
