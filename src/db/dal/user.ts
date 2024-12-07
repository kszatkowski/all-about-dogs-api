import { User, UserAttributesInput } from '@db/models';

export const create = async (payload: UserAttributesInput): Promise<string> => {
  const user = await User.create(payload);

  return user.id;
};

export const isEmailExists = async (email: string): Promise<boolean> => {
  const result = await User.findOne({
    where: {
      email
    }
  });

  return !!result;
};

export const get = async (email: string): Promise<User | null> => {
  const result = await User.findOne({
    where: {
      email
    }
  });

  return result;
};
