import { db } from './modules/db';
import { ref, onValue, set, get } from 'firebase/database';
import { userAvailable, pwdMatch } from './modules/signfunctions';
import { User } from './modules/user';

(function () {
  (function () {
    const form: HTMLElement = document.querySelector('.form-signup');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name: HTMLInputElement = document.querySelector('.form-name');
      const bio: HTMLInputElement = document.querySelector('.form-bio');
      const pwd1: HTMLInputElement = document.querySelector('.form-pwd1');
      const pwd2: HTMLInputElement = document.querySelector('.form-pwd2');
      const radio: HTMLInputElement[] =
        document.querySelectorAll('.form-radio');
      let img: string;

      for (const key of radio) {
        if (key.checked) img = key.value;
      }
      checkUser(name.value, bio.value, pwd1.value, pwd2.value, img);
    });
  })();

  const checkUser = async (
    name: string,
    bio: string,
    pwd1: string,
    pwd2: string,
    img: string
  ) => {
    if (await userAvailable(name)) {
      console.log(`${name} is unavailable`);
    } else if (pwdMatch(pwd1, pwd2)) {
      console.log(`Pwd doesnt match`);
    } else {
      addUser(new User(bio, img, pwd1, name));
    }
  };

  const addUser = (user: User) => {
    // set(ref(db, `/users/${user.getName()}`), user);
    localStorage.setItem('login', true);
    if (localStorage.getItem('login')) console.log('gaming');
  };
})();
