import { checkPwd, userAvailable } from './modules/signfunctions';

(function () {
  // Sätter Addeventlistner på Formen
  (function () {
    const form: HTMLElement = document.querySelector('.form-signin');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name: HTMLInputElement = document.querySelector('.form-name');
      const pwd: HTMLInputElement = document.querySelector('.form-pwd');

      checkUser(name.value.toLowerCase(), pwd.value);
    });
  })();

  // Kollar om användaren uppfyller x antal krav och om lösenord matchar
  const checkUser = async (name, pwd) => {
    if (await !userAvailable(name)) {
      console.log('User doesnt exsist');
    } else if (await checkPwd(name, pwd)) {
      console.log('pwd doesnt match username');
    } else {
      loginUser(name);
    }
  };

  // Skapar session variablerna och skickar användaren till index.html
  const loginUser = (name) => {
    sessionStorage.clear();
    sessionStorage.setItem('login', 'true');
    sessionStorage.setItem('name', name);

    window.location.replace('../');
  };
})();
