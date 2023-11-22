import { IUser } from './user.interface';
import { userModel } from './user.model';

// Service function to create a new user
export async function createUserService(userData: IUser): Promise<IUser> {
  // Create the user using the mongoose model
  const newUser = await userModel.create(userData);
  return newUser;
}

// Service function to get all users
export async function getAllUsersService(): Promise<IUser[]> {
  // Get all users using the mongoose model
  const users = await userModel.find();
  return users;
}

// Service function to get a user by id
export async function getUserByIdService(
  userId: string,
): Promise<IUser | null> {
  const user = await userModel.findOne({ userId: userId });
  return user;
}
