import * as bcrypt from 'bcrypt';

export const hash = (item, rounds: number) => {
  return bcrypt.hash(item, rounds);
};
