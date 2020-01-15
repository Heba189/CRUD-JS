//only declaration the array
var productContainer;
//if the user first use the site or no localstorge before was stored then the returned was null array
  if(localStorage.getItem("productsData")== null){

    productContainer=[];
  }else{
      //else there is data before was stored in localstorge -> then convert it to js object by parse 
      productContainer = JSON.parse(localStorage.getItem("productsData"));
      //with valied return input the function of display will work only once
      displayProducts();
  }

function addProduct(){

    var productName = document.getElementById('productName').value;
    var productPrice =document.getElementById('productPrice').value;
    var productCat = document.getElementById('ProductCategory').value;
    var productDesc = document.getElementById('ProductDesc').value;

    //validated on productName
    // if(validateForm(productName) == true){
         //object to push for array 
            var product = {
                name  : productName,
                price : productPrice,
                cat   : productCat,
                desc  : productDesc
            }

        productContainer.push(product);
        //After push object in array -> we storage Array  in local storage with key productsData
        localStorage.setItem("productsData", JSON.stringify(productContainer));
        displayProducts();
    // }else{
    //     window.alert("userName Not Valid");
    // }

}

function displayProducts(){
    var temp = " ";

    for (var i=0 ; i < productContainer.length ; i++){
        temp +=`
        <div class="col-md-3">
                <div class="product mb-3 border border-info p-3 ">
                    <img src="img/close-up-of-camera-over-black-background-306763.jpg" class="img-fluid" alt="">
                    <h4>`+productContainer[i].name+`<span class="badge badge-primary ml-3">`+productContainer[i].cat+`</span></h4>
                    <p>The Description of`+productContainer[i].name +` is lorem `+ productContainer[i].desc +` </p>
                    <div class="price">`+productContainer[i].price+`</div>
                    <button onclick="deleteProduct(`+i+`)" id="btndel" class="btn btn-outline-danger btn-sm ml-3">Delete</button>
                    <button onclick="updateProduct(`+i+`)" id="btndel" class="btn btn-outline-warning btn-sm ml-3">update</button>
                </div>
            </div>
        
        `
    }
  document.getElementById('productRow').innerHTML = temp;
}
displayProducts();

//filter input //ter is the input that user wrote 
function searchProducts(ter){
   var pro =``;
   for(var i =0 ; i< productContainer.length ;i++){
       //use includes to filter as a letter letter and convert input of searh and input that storage to lowercase to equal
       if(productContainer[i].name.toLowerCase().includes(ter.toLowerCase())){
           //if filter true -> display product 
           pro +=`
              <div class="col-md-3">
                   <div class="product">
                       <img src="img/close-up-of-camera-over-black-background-306763.jpg" class="img-fluid" alt="">
                       <h4>`+productContainer[i].name+`<span class="badge badge-primary ml-3">`+productContainer[i].cat+`</span></h4>
                       <p>The Description of`+productContainer[i].name +` is lorem `+ productContainer[i].desc +` </p>
                       <div class="price">`+productContainer[i].price+`</div>
                   </div>
               </div>`;
           
       }
   }
   //return result only at row 
   document.getElementById('productRow').innerHTML = pro;
}

//delete function that takes attribute of index i
function deleteProduct(index){
  //only deleted from productContainer
    var deleted = productContainer.splice(index,1);

    //delete also from local storge
    localStorage.setItem("productsData",JSON.stringify(productContainer));
    displayProducts();

}

//function validating to enter first char capital and other char small max 8

// function validateForm(userName){
//     var userNameRegex =/^[A-Z][a-z]{3,8}/;
//     if(userNameRegex.test(userName) == false){
//         //disabled btn if valid false
//         document.getElementById('testVald').disabled= true;
//     }else{
//         document.getElementById('testVald').removeAttribute('disabled');
//     }
// };