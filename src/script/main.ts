import { db } from './modules/db';

(function () {
  (function () {
    const parent: HTMLElement = document.querySelector('.nav');

    const home: HTMLElement = document.createElement('a');
    const homeImg: HTMLElement = document.createElement('img');
    
    home.classList.add('nav-item')
    homeImg.classList.add('nav-item')
    homeImg.src = new URL('../img/bx-home.svg', import.meta.url).toString();
    
    const contact: HTMLElement = document.createElement('a');
    const contactImg: HTMLElement = document.createElement('img');
    contact.classList.add('nav-item')
    contactImg.classList.add('nav-items')
    contactImg.src = new URL('../img/bx-home.svg', import.meta.url).toString();



    home.appendChild(homeImg)
    contact.appendChild(contactImg)
    parent.appendChild(home)
    parent.appendChild(contact)

    if (sessionStorage.getItem('login')) {
      const profile: HTMLElement = document.createElement('a');
      const profileImg: HTMLElement = document.createElement('img');
      profile.classList.add('nav-items')
      profileImg.classList.add('nav-items')
        
      const logout: HTMLElement = document.createElement('a');
      const logoutImg: HTMLElement = document.createElement('img');
      logoutImg.src = new URL('../img/bxs-log-out.svg', import.meta.url);
        logout.classList.add('nav-items')
        logoutImg.classList.add('nav-items')
        logout.appendChild(logoutImg)
        profile.appendChild(profileImg)
        parent.appendChild(logout)
        parent.appendChild(profile)


    } else {
      const signin: HTMLElement = document.createElement('a');
      const signinImg: HTMLImageElement = document.createElement('img');
      signinImg.src = new URL('../img/bxs-log-in.svg', import.meta.url).toString()  ;
      signin.classList.add('nav-items')
      signinImg.classList.add('nav-items')  
      signin.appendChild(signinImg)
      parent.appendChild(signin)
        

      const signup: HTMLElement = document.createElement('a');
      const signupImg: HTMLImageElement = document.createElement('img');
      signupImg.src = new URL('../img/signup.svg', import.meta.url).toString();
      signup.classList.add('nav-items')
      signupImg.classList.add('nav-items')
      signup.appendChild(signupImg)
      parent.appendChild(signup)
     

   



    }

  

  })();
})();
