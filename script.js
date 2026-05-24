
window.addEventListener("load",()=>{
  const loader=document.querySelector(".loader");
  if(loader) loader.style.display="none";
});

const menuToggle=document.querySelector(".menu-toggle");
const navLinks=document.querySelector(".nav-links");

if(menuToggle){
  menuToggle.addEventListener("click",()=>{
    navLinks.classList.toggle("active");
  });
}

const products=[
  {id:1,name:"Wireless Headphones",price:120,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"},
  {id:2,name:"Smart Watch",price:180,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30"},
  {id:3,name:"Gaming Mouse",price:70,image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46"},
  {id:4,name:"Fashion Sneakers",price:150,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"}
];

function renderProducts(){
  const container=document.getElementById("product-list");
  if(!container) return;

  container.innerHTML="";
  products.forEach(p=>{
    container.innerHTML+=`
      <div class="card">
        <span class="badge">Sale</span>
        <span class="wishlist">♡</span>
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
        <p class="rating">★★★★★</p>
        <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id){
  let cart=JSON.parse(localStorage.getItem("cart")) || [];
  const product=products.find(p=>p.id===id);

  const existing=cart.find(item=>item.id===id);

  if(existing){
    existing.qty++;
  }else{
    cart.push({...product,qty:1});
  }

  localStorage.setItem("cart",JSON.stringify(cart));
  alert("Added to cart!");
}

function renderCart(){
  const cartContainer=document.getElementById("cart-items");
  const totalEl=document.getElementById("total");

  if(!cartContainer) return;

  let cart=JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML="";

  let total=0;

  cart.forEach(item=>{
    total+=item.price*item.qty;

    cartContainer.innerHTML+=`
      <div class="cart-item">
        <div>
          <h3>${item.name}</h3>
          <p>$${item.price}</p>
        </div>
        <div>
          <button onclick="changeQty(${item.id},-1)">-</button>
          ${item.qty}
          <button onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
    `;
  });

  totalEl.innerText="$"+total;
}

function changeQty(id,change){
  let cart=JSON.parse(localStorage.getItem("cart")) || [];

  cart=cart.map(item=>{
    if(item.id===id){
      item.qty+=change;
      if(item.qty<1) item.qty=1;
    }
    return item;
  });

  localStorage.setItem("cart",JSON.stringify(cart));
  renderCart();
}

window.addEventListener("scroll",()=>{
  const btn=document.querySelector(".back-to-top");
  if(btn){
    btn.style.display=window.scrollY>300?"block":"none";
  }
});

function topFunction(){
  window.scrollTo({top:0,behavior:"smooth"});
}

renderProducts();
renderCart();
