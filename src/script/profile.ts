import { DataSnapshot, get, ref } from 'firebase/database';
import { db } from './modules/db';
import navToggle from './modules/navtoggle';

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
  navToggle();
})();
