export default function navToggle() {
  console.log(document);

  if (sessionStorage.getItem("login")) {
    let btnsignIn: HTMLAnchorElement = document.querySelector("#signinbtn");
    btnsignIn.style.display = "none";
  }
}
