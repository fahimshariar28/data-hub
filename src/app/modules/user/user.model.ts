import { Schema, model } from 'mongoose';
import { TFullName, TAddress, TOrder, IUser } from './user.interface';
import { NextFunction } from 'express';
import bcrypt from 'bcrypt';
import config from '../../config';

// MongoDB schema for the full name
const fullNameSchema: Schema<TFullName> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// MongoDB schema for the address
const addressSchema: Schema<TAddress> = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

// Mongoose schema for the order
const orderSchema: Schema<TOrder> = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Mongoose schema for the user
const userSchema: Schema<IUser> = new Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  fullName: {
    type: fullNameSchema,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  isActivate: {
    type: Boolean,
    required: true,
    default: true,
  },

  hobbies: {
    type: [String],
    required: true,
  },

  address: {
    type: addressSchema,
    required: true,
  },

  orders: {
    type: [orderSchema],
  },
});

// pre hook for the user schema
userSchema.pre<IUser>('save', async function (next) {
  //   Making password hash
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Create and export the mongoose model
export const userModel = model<IUser>('User', userSchema);
