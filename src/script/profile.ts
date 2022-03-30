//FIX TODO:
// -Hämta datan från url (antagligen name="var")
// -Använd name till att hämta data från db
//Tips:
// Används class object för dina addeventlisteners

import { DataSnapshot, get, ref } from 'firebase/database';
import { db } from './modules/db';

((): void => {
  const getUser = (): void => {
    const userName =
      sessionStorage.getItem('name') === null
        ? sessionStorage.getItem('name')
        : sessionStorage.getItem('profile');
    get(ref(db, `/users/${userName}`)).then((snapshot: DataSnapshot): void => {
      if (snapshot.exists()) {
        const { bio, img, username } = snapshot.val();
        let firstName = document.getElementById('username');
        let biography = document.getElementById('bio');
        firstName.innerText = username;
        biography.innerText = bio;
      }
    });
  };
  getUser();
})();
