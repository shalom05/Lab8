import  "../components/export"
import ProductCard  from "../components/products/product";
import firebase from "../utils/firebase"
import { Attributes } from "../components/products/product";
import style from "./dashboard.css"

const formFeed = {
  name:"",
  quantity: "",
  price: "",
  image: "",
};

class Dashboard extends HTMLElement{
    constructor(){
      super();
      this.attachShadow({mode: "open" });
    }

    async uploadform() {
      console.log(formFeed);
      firebase.addPost(formFeed);
    }

    connectedCallback(){
      this.render();
    }
    changeimg(e: any) {
      formFeed.image = e.target.value; 
    }

    changeprice(e: any) {
      formFeed.price = e.target.value; 
    }

    changequantity(e: any) {
      formFeed.quantity = e.target.value; 
    }

    changename(e: any) {
      formFeed.name = e.target.value; 
    }
  

   async render(){
      if(this.shadowRoot)
      this.shadowRoot.innerHTML= `<style>${style}</style>`

      const Uploadcont = this.ownerDocument.createElement("div");
      Uploadcont.classList.add("Uploadcontainer");
      this.shadowRoot?.appendChild(Uploadcont);

      const title= this.ownerDocument.createElement("h1");
      title.innerHTML = "PRODUCTS";
      title.classList.add("title")

      Uploadcont.appendChild(title);

      const inputimg = this.ownerDocument.createElement("input");
      inputimg.placeholder = "Link image";
      inputimg.classList.add("input-img")
      inputimg.addEventListener("change", this.changeimg);

      Uploadcont.appendChild(inputimg);

      const inputname = this.ownerDocument.createElement("input");
      inputname.placeholder = "Product name";
      inputname.classList.add("input-name")
      inputname.addEventListener("change", this.changename);

      Uploadcont.appendChild(inputname);
        
      const inputprice = this.ownerDocument.createElement("input");
      inputprice.classList.add("input-style")
      inputprice.placeholder = "Price of the product";
      inputprice.addEventListener("change", this.changeprice);
      inputprice.classList.add("input-price");

      Uploadcont.appendChild(inputprice);

      const inputquantity = this.ownerDocument.createElement("input");
      inputquantity.classList.add("input-style")
      inputquantity.placeholder = "How many products do you want";
      inputquantity.addEventListener("change", this.changequantity);
      inputquantity.classList.add("input-quantity");

      Uploadcont.appendChild(inputquantity);

      const butn = this.ownerDocument.createElement("button");
      butn.innerHTML = "To Save";
      butn.addEventListener("click", this.uploadform);
      butn.classList.add("mi-butn");
       
    Uploadcont.appendChild(butn);


    const productContainer = this.ownerDocument.createElement("div");
    productContainer.classList.add("product-container");
    console.log(firebase)
    const products = await firebase.getPost();

    products.forEach((productsfeed: any) => {
      const card = this.ownerDocument.createElement("product-card") as ProductCard;
      card.setAttribute(Attributes.name, productsfeed.name);
      card.setAttribute(Attributes.image, productsfeed.image);
      card.setAttribute(Attributes.quantity, productsfeed.quantity);
      card.setAttribute(Attributes.price, productsfeed.price);
      
      productContainer.appendChild(card);
    });

    this.shadowRoot?.appendChild(productContainer);
  }
}
customElements.define("app-dashboard", Dashboard);