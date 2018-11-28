const btn = document.querySelector('#main-button');
const fontsBody = document.querySelector('.fonts-body');
const fontsBodyObject = document.getElementsByClassName('.fonts-body');
const searchInput = document.querySelector('.search');
const closeBtn = document.querySelector('.close-btn');
const apiUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBei32vTRRdKc-ugAanCyby3EkWpoILdY0';
let modal = document.querySelector('.modal');
const fonts = [];
let maxFonts = 0;
let fewFonts = [];
let search = false;


// Fetch API
fetch(apiUrl)
   .then(res => res.json())
   .then(data => fonts.push(...data.items )).then(function(){
      console.log(fonts);
      //Add font family for each font
      fonts.forEach(function(item)
      {
          let head = document.querySelector('head');
          let link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://fonts.googleapis.com/css?family=' + item.family;
          head.appendChild(link);
      });

})
   .catch(err => console.log(err));

//Load 20 more items
function loadMore(index){

   search = false;
   let newFonts = fonts;
   fewFonts = newFonts.splice(index, 20);
   let html = '';
   for(let i = 0; i < fewFonts.length; i++){
      html +=  `
      <div class="font-box">
         <div class="first-font">
         <span class="small-font" >${fewFonts[i].family}</span> 
         <span class="blue-add" data-id="${i}">+</span>
         </div>
         <span class="big-font" style="font-family: ${fewFonts[i].family}, ${fewFonts[i].category}; ">${fewFonts[i].family}</span>
      </div>
      `;
   }
   
   fontsBody.innerHTML = fontsBody.innerHTML + html;
    addEventDisplayFontDetails();

}

function addEventDisplayFontDetails(){

    document.querySelectorAll('.blue-add').forEach(function(item) {

        item.removeEventListener('click', showFontDetails);
        item.addEventListener('click', showFontDetails);

    });

}
function showFontDetails(e){
   let index = e.target.getAttribute('data-id');

   if (search === false)
   {
       console.log(fewFonts[index]);
   }
   else
   {
       console.log(fonts[index]);
   }

}

// When scroll reaches bottom add 20 more fonts
function fontScroll(){
   let fontsBodyHeight = fontsBody.offsetHeight;
      let fontsBodyTop = fontsBody.scrollTop;
      if(fontsBodyHeight + fontsBodyTop == fontsBody.scrollHeight) {
         let loader = document.querySelector('.loader-wrap');
         loader.classList.add('show-loader');
         setTimeout(() => {
            maxFonts += 20;
            loadMore(maxFonts);
            loader.classList.remove('show-loader');  
         }, 500);
         
      }
      
};
// Filter trought all items and find matches
function findMatches(wordToMatch, fonts){
   return fonts.filter(item => {
      const regex = new RegExp(wordToMatch, 'gi');
      return item.family.match(regex)
   });
}
//Display found matches
function displayMatches(){
   search = true;
   const matchArray = findMatches(this.value, fonts);
   const html = matchArray.map((item, index) => {
      return `
      <div class="font-box">
         <div class="first-font">
            <span class="small-font">${item.family}</span> 
            <span class="blue-add" data-id="${index}">+</span>
         </div>
         <span class="big-font" style="font-family: ${item.family}, ${item.category}">${item.family}</span>
      </div>
      `;
      
   }).join('');
   fontsBody.innerHTML = html;

   addEventDisplayFontDetails();
   
}


btn.addEventListener('click', function(){
   modal.classList.add('show-modal');
   loadMore(maxFonts);
});


searchInput.addEventListener('keyup', displayMatches);
 
closeBtn.addEventListener('click', function(){
   modal.classList.remove('show-modal');
   searchInput.value = "";
})

fontsBody.addEventListener('scroll', fontScroll);