const LoadingData=async(SearchText,Data_Limit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${SearchText}`;
    const response=await fetch(url);
    const data= await response.json();
    DisPlayPhones(data.data,Data_Limit);
}


const DisPlayPhones=(data,Data_Limit)=>{
    console.log(data);
    const phoneContainer=document.getElementById("phone-container");
    phoneContainer.innerHTML=''
    const showall=document.getElementById('show_all');
    if( Data_Limit && data.length>10)
      {
       data=data.slice(0,10);
       showall.classList.remove("d-none");
      }
      else showall.classList.add("d-block");
    //display no phones found
    const no_phone_message=document.getElementById("no_phone_message");
     console.log(no_phone_message)
     if(data.length===0)no_phone_message.classList.
     remove('d-none');
     else no_phone_message.classList.add('d-none');
    //display all phones found
    console.log(phoneContainer);
    for(let phone_data of data){
        console.log(phone_data)
        const div=document.createElement("div");
        div.classList.add("col");
        div.innerHTML=`
        <div class="card h-100">
        <img src="${phone_data.image}" 
        class="card-img-top 
        img-fluid w-50 h-50 mt-2 
        ms-2 p-2" alt="...">
        <div class="card-body">
          <h5 class="card-title">
          ${phone_data.phone_name}</h5>
          <button href="#" 
          class="btn btn-danger btn-lg" 
          onclick="showingPhoneDetails('${phone_data.slug}')" data-bs-toggle="modal" 
          data-bs-target="#ProneDetailsModal">
            Show Details
          </button>
        </div>
      </div>
        `;
        phoneContainer.appendChild(div)
    }
    toogleSpinner(false)
}


const searching=(Data_Limit)=>{
        //start loader
      toogleSpinner(true);
      const SearchText =document.getElementById('Input_id').value;
      LoadingData( SearchText,Data_Limit)
}

document.getElementById("Search_id").addEventListener("click",()=>{
   searching(10);
})
 //not to best way to load show all
 const showingAllFunction=()=>{
    const shoAllButton=document.getElementById("btn_showAll");
    shoAllButton.addEventListener("click",()=>{
        searching();
    })

 }
 showingAllFunction()


 
//search input field enter key handler


document.getElementById("Input_id").addEventListener
("keypress",(e)=>{
     if(e.key==="Enter"){
        searching(10);
     }
})



const toogleSpinner=isLoading=>{
    const loaderSection=document.getElementById("Loader");
    if(isLoading)loaderSection.classList.remove('d-none');
    else loaderSection.classList.add('d-none');
}


 //showDetails
const showingPhoneDetails= async(slug)=>{
  // fetchingtata
  const url=`https://openapi.programming-hero.com/api/phone/${slug}`;
  const response=await fetch(url);
  const data=await response.json();
  PhoneDetails(data.data);
}

const PhoneDetails=(data)=>{
   console.log(data);
   const ModalTitle=document.getElementById("ModalTitile");
   ModalTitle.innerText=data.name;
   const Modal_body=document.getElementById("ModalBody");
   Modal_body.innerHTML=`
   <img src="${data.image}" class="ImageStyle"/>
   <div>Name:${data.name}</div>
   <div> Brand:${data.brand}</div>
   <div>Storage:${data.mainFeatures.storage ? data.mainFeatures.storage :"Not Found"}</div>
   <div>Chipset:${data.mainFeatures.chipSet ? data.mainFeatures.chipSet :"Not found"}</div>
   <div>Display:${data.mainFeatures.displaySize ? data.mainFeatures.displaySize:"Not Found"}</div>
   <div>Memory:${data.mainFeatures.memory ? data.mainFeatures.memory:"Not Found"}</div>
   <div>Sensors:${data.mainFeatures.sensors ? data.mainFeatures.sensors :"Not Found"}</div>
   <div>Bluetooth:${data.others.Bluetooth ?data.others.Bluetooth : "Not Found"}</div>
   <div>GPS:${data.others.GPS ?data.others.GPS: "Not Found"}</div>
   <div>NFC:${data.others.NFC ?data.others.NFC: "Not Found"}</div>
   <div>Radio:${data.others.Radio ?data.others.Radio: "Not Found"}</div>
   <div>USB:${data.others.USB ?data.others.USB: "Not Found"}</div>
   <div>WLAN:${data.others.WLAN ?data.others.WLAN: "Not Found"}</div>
   <div>Relase-Date:${data.releaseDate ? data.releaseDate :"No Release Date Found"}</div>
   `
}
showingPhoneDetails();
