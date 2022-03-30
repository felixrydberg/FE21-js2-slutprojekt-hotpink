import { db } from './modules/db';

(function () {
  (function () {
    const parent: HTMLElement = document.querySelector('.nav');

    const home: HTMLElement = document.createElement('a');
    const homeImg: HTMLElement = document.createElement('img');

    const contact: HTMLElement = document.createElement('a');
    const contactImg: HTMLElement = document.createElement('img');

    if (sessionStorage.getItem('login')) {
      const profile: HTMLElement = document.createElement('a');
      const profileImg: HTMLElement = document.createElement('img');

      const logout: HTMLElement = document.createElement('a');
      const logoutImg: HTMLElement = document.createElement('img');
    } else {
      const signin: HTMLElement = document.createElement('a');
      const signinImg: HTMLElement = document.createElement('img');

      const signup: HTMLElement = document.createElement('a');
      const signupImg: HTMLElement = document.createElement('img');
    }
  })();
})();
