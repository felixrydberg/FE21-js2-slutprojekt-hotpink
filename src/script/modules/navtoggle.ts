export default function navToggle() {
  if (sessionStorage.getItem("login")) {
    document
      .getElementById("profile")
      .addEventListener("click", (e: MouseEvent): void => {
        console.log("profile");
        e.preventDefault();
        sessionStorage.setItem("profile", sessionStorage.getItem("name"));
      });
    let btnsignIn: HTMLAnchorElement = document.querySelector("#signinbtn");
    btnsignIn.style.display = "none";
  }
}
