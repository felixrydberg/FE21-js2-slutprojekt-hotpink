import { db } from './db';
import { ref, get } from 'firebase/database';

export async function userAvailable(name): Promise<boolean> {
  const data = get(ref(db, `/users`));
  for (const key in (await data).val()) {
    if ((await data).val()[key].username === name) return true;
  }
}

export const pwdMatch = (pwd1, pwd2): boolean => {
  if (pwd1 === pwd2) {
    return false;
  } else {
    return true;
  }
};
