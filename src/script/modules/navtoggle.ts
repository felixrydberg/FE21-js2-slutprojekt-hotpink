export default function navToggle() {
  if (sessionStorage.getItem('login')) {
    let btnsignIn: HTMLAnchorElement = document.querySelector('#signinbtn');
    btnsignIn.style.display = 'none';
  }
}
