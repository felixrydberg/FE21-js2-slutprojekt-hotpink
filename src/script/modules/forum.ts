import { db } from './db';
import { DataSnapshot, onValue, ref } from 'firebase/database';
import { createPostgui } from './Post';
import navToggle from './navtoggle';

((): void => {
  const dbRef = ref(db, '/posts');
  onValue(dbRef, (snapshot: DataSnapshot): void => createPostgui());
  navToggle();
})();
