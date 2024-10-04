
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: "https://recebimentoextrema-8af56-default-rtdb.firebaseio.com"
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://recebimentoextrema-8af56-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const firebaseConfig = {
  apiKey: "AIzaSyBYcl2C_AV4lghpEnd5f1tATHzS2guzB88",
  authDomain: "recebimentoextrema-8af56.firebaseapp.com",
  databaseURL: "https://recebimentoextrema-8af56-default-rtdb.firebaseio.com",
  projectId: "recebimentoextrema-8af56",
  storageBucket: "recebimentoextrema-8af56.appspot.com",
  messagingSenderId: "768006817358",
  appId: "1:768006817358:web:66245d2e74095ac62ae51f"
};
// Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Função para adicionar um novo item
function addItem() {
    const itemRef = database.ref('items'); // Caminho onde os dados serão armazenados
    const newItemRef = itemRef.push(); // Cria uma nova referência para um item
    newItemRef.set({
        name: "Novo Item",
        description: "Descrição do novo item"
    });
}

// Função para ler os dados
function readItems() {
    const itemRef = database.ref('items');
    itemRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
}

// Chame as funções
addItem();
readItems();
