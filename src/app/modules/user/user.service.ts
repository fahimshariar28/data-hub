import { IUser } from './user.interface';
import { userModel } from './user.model';

// Service function to create a new user
export async function createUserService(userData: IUser): Promise<IUser> {
  // Create the user using the mongoose model
  const newUser = await userModel.create(userData);
  return newUser;
}
