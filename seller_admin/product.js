var form = document.getElementById("addForm");
let pr = 0;
var productlist = document.getElementById("products");
form.addEventListener("submit", addProduct);
function addProduct(e) {
  e.preventDefault();

  var newamount = document.getElementById("amount").value;
  var newname = document.getElementById("productName").value;

  let myObj = {
    price: newamount,
    productName: newname,
  };
  axios
    .post("http://localhost:3000/product", myObj)
    .then((response) => {
      showondom(response.data);
      document.getElementById("amount").value = "";
      document.getElementById("productName").value = "";
      document.getElementById("total").innerHTML = pr + parseInt(myObj.price);
    })
    .catch((err) => console.log(err));
}
document.addEventListener("DOMContentLoaded", fatchProducts);
function fatchProducts() {
  axios
    .get("http://localhost:3000/product")
    .then((response) => {
      response.data.map((e) => {
        pr = pr + parseInt(e.price);
        showondom(e);
      });
      document.getElementById("total").innerHTML = pr;
    })
    .catch((err) => {
      console.log(err);
    });
}
function showondom(Obj) {
  var li = document.createElement("div");
  li.classList.add("form", "rounded", "border", "shadow", "p-4");
  const deletebtn = document.createElement("button");
  deletebtn.className = "dbtn";
  deletebtn.innerHTML = "Delete Product";

  li.innerHTML =
    " Product Name : " + Obj.productName + " price : " + Obj.price + "<br>";
  li.appendChild(deletebtn);
  productlist.appendChild(li);
  deletebtn.onclick = () => {
    let lin = `http://localhost:3000/product/${Obj.id}`;
    axios
      .delete(lin)
      .then((response) => {
        document.getElementById("total").innerHTML = pr - parseInt(Obj.price);
        productlist.removeChild(li);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
