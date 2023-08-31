const handleCategory=async()=>{
    const res=await fetch(' https://openapi.programming-hero.com/api/videos/categories')
    const data=await res.json()
    const allCategory=data.data;

    showCategory(allCategory);

}

handleCategory()

const showCategory=(allCategory)=>{
    const categoryContainer=document.getElementById('category-container')

    allCategory.forEach(category => {
        // console.log(category)
        const div=document.createElement('div')
        div.innerHTML=`
        <button onclick="handleIndividualCategory('${category.category_id
        }')" class="bg-[#25252533] px-5 py-2 text-[18px] font-medium rounded">${category.category}</button>
        `
        categoryContainer.appendChild(div);
    });
}



const handleIndividualCategory=async(id)=>{
          const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
          const data=await res.json()
          const card=data.data
          
          const indiVidualCategoryContainer=document.getElementById('invidual-categoryContainer')
          indiVidualCategoryContainer.innerHTML=''
          card.forEach(item=>{
           console.log(item.authors[0].profile_picture)
        const div=document.createElement('div')
        div.innerHTML= `
                 <div class="card bg-base-100 shadow-xl">
                 <figure><img class="h-[200px]" src='${item.thumbnail}'
                  /></figure>
                 <div class="card-body">
                 <div>
                    <img class='h-[40px] w-[40px] rounded-[50%]' src="${item.authors[0].profile_picture}"/>
                    
                 </div>
                 <h2 class="card-title">
                     Shoes!
                     <div class="badge badge-secondary">NEW</div>
                 </h2>
                 <p>If a dog chews shoes whose shoes does he choose?</p>
                 <div class="card-actions justify-end">
                     <div class="badge badge-outline">Fashion</div> 
                     <div class="badge badge-outline">Products</div>
                 </div>
                 </div>
                 </div>
        
        `
            indiVidualCategoryContainer.appendChild(div)
       })
}