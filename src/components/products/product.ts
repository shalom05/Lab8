import Style from "./style.css"

    export enum Attributes {
    "image"="image",
    "price"="price",
    "name"="name",
    "quantity"="quantity"
    }

    class ProductCard extends HTMLElement{
    image?: string;
    price?:string;
    quantity?:string;
    name?:string;

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    

    static get observedAttributes(){
    const attrs: Record <Attributes, null> = {
        image:null,
        price:null,
        quantity:null,
        name:null,
    }
    return Object.keys(attrs);
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(propName: Attributes, oldValue:string |undefined, newValue:string |undefined){
    switch (propName) {
   
    default:
        this[propName]= newValue;
        break;
     }

     this.render();

    }

    render(){
        if(this.shadowRoot){  
            this.shadowRoot.innerHTML= `<style>${Style}</style>`;

            const productDiv = this.ownerDocument.createElement('div');
            productDiv.classList.add('product');

            const nameHeader = this.ownerDocument.createElement('h1');
            nameHeader.classList.add('productname');
            nameHeader.textContent = `Name: ${this.name}`;
            productDiv.appendChild(nameHeader);

            const imageElement = this.ownerDocument.createElement('img');
            imageElement.classList.add('product-image');
            imageElement.src = `${this.image}`;
            imageElement.alt = 'imagen de producto';
            productDiv.appendChild(imageElement);

            const priceHeader = document.createElement('h2');
            priceHeader.classList.add('productprice');
            priceHeader.textContent = `Price: ${this.price}`;
            productDiv.appendChild(priceHeader);

            const quantityParagraph = document.createElement('p');
            quantityParagraph.classList.add('quantity');
            quantityParagraph.textContent = `Quantity: ${this.quantity}`;
            productDiv.appendChild(quantityParagraph);

            this.shadowRoot?.appendChild(productDiv);
        }
    }
}

customElements.define("product-card", ProductCard);
export default ProductCard;
