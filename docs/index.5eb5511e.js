(()=>{const e=document.querySelector(".index-main");["gaming","programmering","mat"].forEach((t=>{const o=document.createElement("article");o.classList.add("article-category");const n=document.createElement("a");n.setAttribute("href","./forum.html"),n.setAttribute("target","_self"),n.addEventListener("click",(e=>sessionStorage.setItem("category",t)));const r=document.createElement("h2");r.classList.add("forum-category"),n.appendChild(r),o.appendChild(n),r.innerText=t.toUpperCase(),e.appendChild(o)}))})(),function(){if(sessionStorage.getItem("login")){document.getElementById("profile").addEventListener("click",(e=>{e.preventDefault(),sessionStorage.setItem("profile",sessionStorage.getItem("name").toLowerCase()),window.location.replace("./profile.html")})),document.querySelector("#signinbtn").style.display="none",document.querySelector("#signupbtn").style.display="none",document.querySelector("#profile").style.display="block";let e=document.querySelector("#logoutbtn");e.style.display="block",e.addEventListener("click",(()=>{sessionStorage.clear(),location.reload()}))}}();
//# sourceMappingURL=index.5eb5511e.js.map