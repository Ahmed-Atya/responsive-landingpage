let mainColor = window.localStorage.getItem("color-option");
if(mainColor !== null){

  document.documentElement.style.setProperty("--main-color", mainColor);

  document.querySelectorAll('.color-list li').forEach(element =>{

    element.classList.remove("active");

    if(element.dataset.color == mainColor){

     element.classList.add("active");
    }
  });
}
// toggle spinner
let gearIcon = document.querySelector(".toggle-spin .fa-gear");

gearIcon.addEventListener('click',toggleSpinner);

 function toggleSpinner(){

    // Make the gear spin by toggling fa-spin class
    this.classList.toggle("fa-spin");

    // Toggle open and close setting box panel
    document.querySelector(".setting-box").classList.toggle("open");

};

// Swapping Colors
const colorList = document.querySelectorAll(".color-list li");

// loop through all list items
colorList.forEach(li =>{

  // handeling click on every list item
  li.addEventListener('click', function(e){

    console.log(e.target.dataset.color);

    // stting colors to the root element
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    // Add the color to the local storage
    window.localStorage.setItem("color-option",e.target.dataset.color);

    // rmoving all active classes from all and laeave the target only
    handleActiveClass(e);

  });
});
// End Swapping Colors
// Set randomBackground variable
let backgroundOption = true;

// Set controling variable relate to interval
let intervalBackground;

// Checking random bg existency in local storage
let bgLocalItem = window.localStorage.getItem("random-background");

// checking that local storage not contain any bg as a key
if(bgLocalItem !== null){

  if(bgLocalItem === "true"){

    backgroundOption = true;
  }else{
    backgroundOption = false;
  }
  document.querySelectorAll(".random-bg span").forEach(element =>{

    element.classList.remove("active");

     if(bgLocalItem === "true"){

       document.querySelector(".random-bg .yes").classList.add("active");
     }else{
       document.querySelector(".random-bg .no").classList.add("active");
     }
  });
}

// Swapping random bg images
const randomBg = document.querySelectorAll(".random-bg span");

// loop through all span items
randomBg.forEach(span =>{

  // handeling click on every span item
  span.addEventListener('click', function(e){

    // rmoving all active classes from all and laeave the target only
    e.target.parentElement.querySelectorAll('span').forEach(element =>{

      element.classList.remove("active");

      e.target.classList.add("active");

      if(e.target.dataset.background === "yes"){

          backgroundOption = true;

          randomAnImage();

          localStorage.setItem("random-background",true);
      }else{
      
        backgroundOption = false;

        clearInterval(intervalBackground);

        localStorage.setItem("random-background",false);

        // stop Function randomAnImage() from work
      }
    });
  });
});
// End Swapping random bg images


// setting landing-page variable
let landingPage = document.querySelector(".landing-page");

// Seiing an array of images
let images = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];

function randomAnImage(){

   if(backgroundOption === true){

    // set repetive images show 
    intervalBackground = setInterval(() => {
      // Getting random number

    let randomNum = Math.floor(Math.random() * images.length);

    landingPage.style.backgroundImage ='url("images/'+images[randomNum]+'")'

    },2000);
    
  }
  
}

// our skills progress section

// caching skill variable
let ourSkills = document.querySelector(".our-skills");

window.onscroll = function(){

      // getting the top offset of skils section
    let skillsOfsetTop = ourSkills.offsetTop;

    // getting the outer height of skills section
    let skillsOuterHeight = ourSkills.offsetHeight;

    // get window height
    let windowHeight = this.innerHeight;
    
    // getting window Scroll Top
    let windowScrollTop = window.pageYOffset;
 

    if(windowScrollTop > (skillsOfsetTop + skillsOuterHeight - windowHeight)){

      let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

      allSkills.forEach(skill =>{

        skill.style.width = skill.dataset.progress;
        skill.textContent = skill.dataset.progress;
      });
    
    }
  
};
// End our skills progress section

// Start Gallery section
let ourGallery = document.querySelectorAll(".our-gallery .images-box img");

ourGallery.forEach(img => {
  img.addEventListener('click',overlayForImage);

  function overlayForImage(){

      // setting an overlay vriable
      let overlay = document.createElement("div");
      
      // add class to the overlay
      overlay.className = "overlay-popup";

      // and then add append it to the body
      document.body.appendChild(overlay);
      // Setting a box of the model
      let popupBox = document.createElement("div");
      // Add a class to it
      popupBox.className = 'popup-box';

      if(img.alt != null){
      
        // Setting alt text Box as h3
        let altHeading = document.createElement("h3");
        altHeading.className ="alt-h3";

        // creating the text of h3
        let altText = document.createTextNode(img.alt);

        // append the text to the box (h3)
        altHeading.appendChild(altText);

        // append the h3 to the model
        popupBox.appendChild(altHeading);
      }

      // creating the image box
      let boxImage = document.createElement("img");
      // Assigning the src of the image
      boxImage.src =img.src;
      // Append the image to the model box
      popupBox.appendChild(boxImage);

      // Append the model to the body
      document.body.appendChild(popupBox);
      
      // Set a variable to the close icon
      let closeElement = document.createElement("span");
        
      // set a class to the span element
      closeElement.className = "close-button";

      // set the text of the span element
      let closeText = document.createTextNode("X");
      
      // append the text to the span element
      closeElement.appendChild(closeText);

      // append the span to the model
      popupBox.appendChild(closeElement);

  }
});

// When you find an element with class of close-butoon remove its parent and other siblings

document.addEventListener('click',function(e){

 if(e.target.className == "close-button"){

   e.target.parentElement.remove();
   
   document.querySelector(".overlay-popup").remove();
 }

});


// Small Bullets Section

let bullets = document.querySelectorAll(".nav-bullets .bullet");

// // links Bullets navigation

let links = document.querySelectorAll(".header-area .links a");
// Define a dynamic funcation
function scrollToSection(elements){
  elements.forEach(element => {

    element.addEventListener("click", (e)=>{
      
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior : "smooth"
      });
    });
  
  });
}
scrollToSection(links);

scrollToSection(bullets);

// Handing active class through all project
function handleActiveClass(ev){
  ev.target.parentElement.querySelectorAll('.active').forEach(element =>{

    element.classList.remove("active");

    ev.target.classList.add("active");
  });
}


let bulletSpan = document.querySelectorAll(".show-bullets span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = window.localStorage.getItem("bullets_option");

if(bulletLocalItem !== null){

  bulletSpan.forEach(span=>{

    span.classList.remove('active');
  });

  if(bgLocalItem === 'block'){

    window.localStorage.setItem('bullets_option','block');

    document.querySelector(".show-bullets .yes").classList.add('active');
  }else{
    window.localStorage.setItem('bullets_option','none');
    
    document.querySelector(".show-bullets .no").classList.add('active');
  }
}

bulletSpan.forEach(bullet =>{
  bullet.addEventListener("click", (e)=>{
   if(bullet.dataset.display === "show"){

     bulletsContainer.style.display = "block";

     window.localStorage.setItem('bullets_option','block');

   }else{
     bulletsContainer.style.display = "none";

     window.localStorage.setItem('bullets_option','none');
   }
   handleActiveClass(e);
  });

});

//Toggle Menu Section
let toggleButton = document.querySelector(".toggle-menu");

let list = document.querySelector(".links");

toggleButton.addEventListener('click',function(){
  this.classList.toggle("menu-active");
  list.classList.toggle("open");
});
