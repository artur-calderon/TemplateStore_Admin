// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getFirestore, collection, query, onSnapshot, where} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7v6t82IlgYivcH4MxvLY0zAdJ2OFge8E",
  authDomain: "templatestore-fc2dc.firebaseapp.com",
  projectId: "templatestore-fc2dc",
  storageBucket: "templatestore-fc2dc.appspot.com",
  messagingSenderId: "537863752457",
  appId: "1:537863752457:web:b0583ddf84e0ea4c5fe1d8",
  measurementId: "G-KCCC5G1QC9"
};

//icons
feather.replace()

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)



// ################ PEDIDOS ################

const containerPedidos = document.querySelector('.conteudoPedidos');

const q = query(collection(db,"clientes"));


onSnapshot(q , res=>{
  res.docs.map(clientes =>{
    
    const p = query(collection(db,"pedidos"), where("cpf" , "==", clientes.data().cpf));
    onSnapshot(p , prod=>{
      if(prod.empty){
        containerPedidos.innerHTML = "<h3>Oops! Parece que não temos pedidos ainda.</h3>"
      }
      prod.docs.map(val=>{
        const produtosPedidos = [...new Set(val.data().cartProductsPage)]
        for (let i = 0; i < produtosPedidos.length; i++) {
        containerPedidos.innerHTML+=`
        <div class="accordion" id="${clientes.id}">
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading${clientes.id}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${clientes.id}" aria-expanded="true" aria-controls="collapes${clientes.id}">
              <p>Nome: ${clientes.data().name}</p><br> 
              <p>CPF: ${clientes.data().cpf} </p>
              <p>Endereço: ${clientes.data().cpf} </p>
              <p>Telefone: ${clientes.data().telefone} </p>
              <p>Email: ${clientes.data().email} </p>
            </button>
          </h2>
          <div id="collapse${clientes.id}" class="accordion-collapse collapse hide" aria-labelledby="heading${clientes.id}" data-bs-parent="#accordionExample">
            <div class="accordion-body">
            <div class="card">
            <div class="cardContainer">
              <div class="img">
                <img src=${produtosPedidos[i].url} alt="product image"/>            
              </div>
              <div class="info">
                <h6>${produtosPedidos[i].title}</h6>
                <p>Quantidade: ${produtosPedidos[i].quantidade}</p>
                <p>Valor Unitário: ${produtosPedidos[i].price}</p>
                <p>Total: ${val.data().total}</p>
                <p>Condicional: ${val.data().condicional ? "Sim" : "Não"}</p>
              </div>
            </div>
          </div>
            </div>
          </div>
          </div>
        </div>
        `
        }
      })

    })
   

   
  })
})
