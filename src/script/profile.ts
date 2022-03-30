//FIX TODO:
// -Hämta datan från url (antagligen name="var")
// -Använd name till att hämta data från db
//Tips:
// Används class object för dina addeventlisteners

import { get, ref } from "firebase/database";
import { db } from "./modules/db";
import User from "./modules/User";
import navToggle from "./modules/navtoggle";

const userName = sessionStorage.getItem("name");

async function getUser() {
  let snapshot = get(ref(db, `/users/${userName}`));
  if ((await snapshot).exists()) {
    const { bio, img, username } = (await snapshot).val();
    let firstName = document.getElementById("username");
    let biography = document.getElementById("bio");
    firstName.innerText = username;
    biography.innerText = bio;
  }

  console.log(userName, getUser);
}
getUser();
navToggle();
