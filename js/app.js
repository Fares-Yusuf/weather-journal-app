/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: Bootstrap 5.2
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 */
const sections = document.querySelectorAll("section");
let nav_section = [];
let nav_ul = document.getElementById("navbar__list").innerHTML;

/**
 * End Global Variables
 */

// build the nav
for (let i = 0; i < sections.length; i++) {
  nav_section.push(sections[i].id);
  nav_ul +=
    '<li class="nav-item"><a class="nav-link active" aria-current="page" name="' +
    sections[i].id +
    '" href="#">' +
    sections[i].id +
    "</a></li>";
}

setTimeout(() => {
  document.getElementById("navbar__list").innerHTML = nav_ul;
  scrollToSection();
  myFunction();
}, 0);

/**
 * Add class 'active' to section when near top of viewport
 * Set sections as active
 */
function myFunction() {
  for (let i = 0; i < nav_section.length; i++) {
    // will get the section using its ID
    let section = document.getElementById(nav_section[i]);
    // let old_section = document.getElementById(nav_section[i - 1]);
    let active_list = document.querySelectorAll(".your-active-class");
    // will get the nav item using its name
    let nav_name = document.querySelector('[name="' + nav_section[i] + '"]');
    const mySectiontHeight = section.offsetHeight;
    const mySectionWidth = section.offsetWidth;
    if (checkViewPort(section, mySectionWidth, mySectiontHeight)) {
      if (active_list.length === 0) {
        section.classList.add("your-active-class");
        nav_name.classList.add("activeMenuItem");
      }
    } else {
      section.classList.remove("your-active-class");
      nav_name.classList.remove("activeMenuItem");
    }
  }
}

// function to check if the section is in the viewport
function checkViewPort(myElement, mySectionWidth, mySectiontHeight) {
  let bounding = myElement.getBoundingClientRect();
  if (
    bounding.top - 200 >= -mySectiontHeight &&
    bounding.left >= -mySectionWidth &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth) +
        mySectionWidth &&
    bounding.bottom + 200 <=
      (window.innerHeight || document.documentElement.clientHeight) +
        mySectiontHeight
  ) {
    return true;
  }
  return false;
}

// Scroll to anchor ID using scrollTO event
function scrollToSection() {
  let nav_links = document.querySelectorAll(".nav-link");
  nav_links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      let section = document.getElementById(link.name);
      // using behavior smooth as part of the requirements
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}
