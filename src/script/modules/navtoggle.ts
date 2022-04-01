export default function navToggle(): void {
  if (sessionStorage.getItem('login')) {
    document
      .getElementById('profile')
      .addEventListener('click', (e: MouseEvent): void => {
        e.preventDefault();
        sessionStorage.setItem('profile', sessionStorage.getItem('name'));
        window.location.replace('../profile.html');
      });
    let btnsignIn: HTMLAnchorElement = document.querySelector('#signinbtn');
    btnsignIn.style.display = 'none';

    // Om man är inloggad visas denna knapp. Om man trycker på den tas variabler i SessionStorage bort och sidan laddas om
    let btnlogout: HTMLAnchorElement = document.querySelector('#logoutbtn');
    btnlogout.style.display = 'block';
    btnlogout.addEventListener('click', () => {
      sessionStorage.clear();
      location.reload();
    });
  }
}
