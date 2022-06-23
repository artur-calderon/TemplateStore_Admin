// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js'
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  where
} from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC7v6t82IlgYivcH4MxvLY0zAdJ2OFge8E',
  authDomain: 'templatestore-fc2dc.firebaseapp.com',
  projectId: 'templatestore-fc2dc',
  storageBucket: 'templatestore-fc2dc.appspot.com',
  messagingSenderId: '537863752457',
  appId: '1:537863752457:web:b0583ddf84e0ea4c5fe1d8',
  measurementId: 'G-KCCC5G1QC9'
}

//icons
feather.replace()

// Initialize Firebase

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

// ################ PEDIDOS ################

const containerPedidos = document.querySelector('.conteudoPedidos')

containerPedidos.innerHTML =
  "<div class='spinner-border' role='status'><span class='visually-hidden'>Loading...</span></div>"

const q = query(collection(db, 'pedidos'))

onSnapshot(q, res => {
  console.log(res.docs.length)
  if (res.docs.length >= 1) {
    document.querySelector('.newOrder').innerHTML = res.docs.length
    document.querySelector('.newOrder').classList.toggle('showNewOrder')
  }

  containerPedidos.innerHTML = ''

  res.docs.map(prod => {
    const p = query(
      collection(db, 'clientes'),
      where('cpf', '==', prod.data().cpf)
    )

    onSnapshot(p, cli => {
      cli.docs.map(clientes => {
        console.log(clientes.data().name)

        containerPedidos.innerHTML += `
        <div class="accordion" id="${clientes.id}">
        <div>
              <button>teste</button>
            </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading${clientes.id}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${
              clientes.id
            }"aria-expanded="true" aria-controls="collapes${clientes.id}">
              <p>Nome: ${clientes.data().name}</p><br> 
              <p>CPF: ${clientes.data().cpf} </p>
              <p>Endereço: ${clientes.data().cpf} </p>
              <p>Telefone: ${clientes.data().telefone} </p>
              <p>Total do pedido: ${formatNumber(prod.data().total)} </p>
              <p>Conluir pedido</p>
            </button>
            </h2>
            
            `

        const produtosPedidos = prod.data().cartProductsPage
        produtosPedidos.map(val => {
          containerPedidos.innerHTML += `
           <div id="collapse${
             clientes.id
           }" class="accordion-collapse collapse hide" aria-labelledby="heading${
            clientes.id
          }" data-bs-parent="#accordionExample">
             <div class="accordion-body">
                <div class="card">
                    <div class="container-fluid cardContainer">
                      <div class="img">
                        <img src=${val.url} alt="product image"/>            
                      </div>
                        <div class="info">
                          <h6>${val.title}</h6>
                          <p>Quantidade: ${val.quantidade}</p>
                          <p>Valor Unitário: ${formatNumber(val.price)}</p>
                      </div>
                  </div>
              </div>
             </div>
           </div>
           
         </div>
         </div>
         `
        })
      })
    })
  })
})

function formatNumber(number) {
  return Number(number).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
