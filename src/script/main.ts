import { db } from './modules/db';
import { DataSnapshot, onValue, ref } from 'firebase/database';
import { createPostgui } from './modules/Post';

((): void => {
  const dbRef = ref(db, '/posts');
  onValue(dbRef, (snapshot: DataSnapshot): void => createPostgui());
})();
