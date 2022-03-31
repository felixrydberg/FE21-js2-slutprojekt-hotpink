import { DataSnapshot, get, ref, remove } from 'firebase/database';
import { db } from './modules/db';
import navToggle from './modules/navtoggle';

((): void => {
  if (!sessionStorage.getItem('login')) {
    window.location.replace('/');
  }
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
        let profilePicture = <HTMLImageElement>(
          document.getElementById('profilepic')
        );

        profilePicture.src = img;
        firstName.innerText = username;
        biography.innerText = bio;

        if (sessionStorage.getItem('name') === userName) {
          const removeAccount: HTMLButtonElement =
            document.querySelector('.remove-profile');
          removeAccount.addEventListener('click', (e: MouseEvent): void => {
            e.preventDefault();
            const dbRef = ref(db, `/users/${userName}`);
            remove(dbRef);
            sessionStorage.clear();
            window.location.replace('../index.html');
          });
        }
      }
    });
  };
  getUser();
  navToggle();
})();
