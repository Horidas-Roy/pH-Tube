const handleCategory = async () => {
  const res = await fetch(
    " https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const allCategory = data.data;

  showCategory(allCategory);
};

handleCategory();

const showCategory = (allCategory) => {
  const categoryContainer = document.getElementById("category-container");

  allCategory.forEach((category) => {
    // console.log(category)
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="handleIndividualCategory('${category.category_id}')" class="bg-[#25252533] px-5 py-2 text-[18px] font-medium rounded">${category.category}</button>
        `;
    categoryContainer.appendChild(div);
  });

  const allBtn = categoryContainer.querySelectorAll("button");

  let toggleBtn = null;
  //  handle default btn bg
  let defaultBtn = allBtn[0];
  defaultBtn.style.backgroundColor = "#FF1F3D";
  defaultBtn.style.color = "#FFF";
  toggleBtn = defaultBtn;

  //  handle btn bg
  allBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (toggleBtn) {
        toggleBtn.style.backgroundColor = "";
        toggleBtn.style.color = "";
      }

      btn.style.backgroundColor = "#FF1F3D";
      btn.style.color = "#FFF";

      const shortByViewBtn=document.getElementById('short-byView')
      shortByViewBtn.style.backgroundColor=""
      shortByViewBtn.style.color=""

      toggleBtn = btn;
    });
  });
};

const handleIndividualCategory = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const card = data.data;

  const indiVidualCategoryContainer = document.getElementById(
    "invidual-categoryContainer"
  );
  indiVidualCategoryContainer.innerHTML = "";
  card.forEach((item) => {
    //  console.log(item)
    const div = document.createElement("div");
    div.classList.add('single-card')
    div.innerHTML = `
                 <div class="card bg-base-100 shadow-xl h-[370px]">
                 <figure>
                 <img class="h-[200px] w-[100%] relative" src='${
                   item.thumbnail
                 }'/>
                 <p class='absolute bg-black rounded-lg px-2 text-white right-4 top-36'>${convertSecToHourMin(
                   item.others.posted_date
                 )}</p>
                  </figure>

                 <div class="card-body">
                 <div class="flex  gap-3 font-bold">
                   <div>
                   <img class='h-[40px] w-[40px] rounded-[50%]' src="${
                     item.authors[0].profile_picture
                   }"/>
                
                   </div>
                    <div> 
                       <h2>${item.title}</h2>
                        <p class="flex gap-2 text-[#171717B2] text-[14px] my-2 font-normal">${
                          item.authors[0].profile_name
                        } 
                        ${
                          item.authors[0].verified == false ||
                          item.authors[0].verified == ""
                            ? " "
                            : '<img src="./images/varified.png">'
                        }
                        </p>
                        <p class="text-[#171717B2] text-[14px] font-normal views">${
                          item.others.views
                        } views</p>
                    </div>
                 </div>
                 </div>
        
                 `;

    indiVidualCategoryContainer.appendChild(div);
  });

  const containerElement = indiVidualCategoryContainer.querySelectorAll("div");
  if (containerElement.length == 0) {
    const div = document.createElement("div");
    div.classList.add("text-center");
    div.classList.add("w-[90vw]");
    div.classList.add("h-[70vh]");
    div.classList.add("mx-auto");
    div.innerHTML = `
                             <img class="inline-block mx-auto pt-16 pb-14 w-[130px]" src="./images/Icon.png">
                             <h1 class="font-bold text-3xl">Oops!! Sorry, There is no<br> content here</h1>
                      `;
    indiVidualCategoryContainer.appendChild(div);
    // console.log(div);
  }
};

handleIndividualCategory("1000");

const convertSecToHourMin = (secString) => {
  const sec = parseFloat(secString);
  // console.log(sec)
  if (isNaN(sec)) {
    return " ";
  } else {
    const totalMin = Math.floor(sec / 60);
    const totalHour = Math.floor(totalMin / 60);
    // console.log(totalHour)
    const restMin = Math.floor(totalMin % 60);

    return totalHour + " hrs " + restMin + " min ago";
  }
};

const navbarBtncontainer = document.getElementById("navbar-btn");
const AllNavbarBtn = navbarBtncontainer.querySelectorAll("button");
// const AllNavbarBtn=document.querySelectorAll('button')

let toggleBtn = null;
AllNavbarBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (toggleBtn) {
      toggleBtn.style.backgroundColor = "";
      toggleBtn.style.color = "";
    }

    btn.style.backgroundColor = "#FF1F3D";
    btn.style.color = "#FFF";

    toggleBtn = btn;
  });
});


const shortByView=()=>{
      const dataContainer=document.getElementById('invidual-categoryContainer')
      const allDivs=Array.from(dataContainer.querySelectorAll('.single-card'))
      // console.log(allDivs.length)
      if (allDivs.length == 0) {
        const div = document.createElement("div");
        div.classList.add("text-center");
        div.classList.add("w-[90vw]");
        div.classList.add("h-[70vh]");
        div.classList.add("mx-auto");
        div.innerHTML = `
                                 <img class="inline-block mx-auto mt-16 mb-8 w-[140px]" src="./images/Icon.png">
                                 <h1 class="font-bold text-3xl">Oops!! Sorry, There is no<br> content here</h1>
                          `;
        dataContainer.innerHTML='';
        dataContainer.appendChild(div);
        return 0;
      }
    
      const divWithViews= allDivs.map(div=>{
              const viewsStr=div.querySelector('.views');
              const views=parseFloat(viewsStr.textContent)*1000;
              // console.log(views)
              

              return {element : div, views : views};
      })
      console.log(divWithViews)
      
      divWithViews.sort((a,b)=> b.views-a.views)
      dataContainer.innerHTML='';

      divWithViews.forEach(item=>{
        dataContainer.appendChild(item.element);
        // console.log(div)
      })
}


const handleBlog=()=>{
    console.log('blog clicked')
    window.location.href="./blog.html"
}