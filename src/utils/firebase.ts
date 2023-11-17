import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs, getFirestore, serverTimestamp, query, onSnapshot,  } from "firebase/firestore";


export const firebaseConfig = {
  apiKey: "AIzaSyCOPhAvavMNND2shDVA68dZBDWokCQ3cQY",
  authDomain: "data-algoritmos-5e26d.firebaseapp.com",
  projectId: "data-algoritmos-5e26d",
  storageBucket: "data-algoritmos-5e26d.appspot.com",
  messagingSenderId: "1080782283856",
  appId: "1:1080782283856:web:b134f5162151770b379d55"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addPost = async (product: any) => {
  try {
    const commentData = collection(db, "Productos");
    await addDoc(commentData, {
      ...product,
      createdAt: serverTimestamp(),
    });
    console.log("Se añadió un artículo");
  } catch (error) {
    console.error(error);
  }
};

export const getPost = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Productos"));
    const posted: any = [];

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      posted.push({
        id: doc.id,
        ...product,
      });
    });

    posted.sort((a: any, b: any) => (b.createdAt ? b.createdAt.toMillis() : 0) - (a.createdAt ? a.createdAt.toMillis() : 0));

    // Invierte el orden para que los más recientes estén primero
    return posted.reverse();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const tiempoRealProductos = async (contenedor: HTMLElement) => {
  const q = query(collection(db, "Productos"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posted: any = [];

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      posted.push({
        id: doc.id,
        ...product,
      });
    });

    // Limpiar el contenido actual del contenedor
    contenedor.innerHTML = "";

    // Agregar los nuevos elementos al contenedor
    posted.forEach((product: any) => {
      const card = document.createElement("product-card");
      card.setAttribute("quantity", product.quantity);
      card.setAttribute("name", product.name);
      card.setAttribute("image", product.image);
      card.setAttribute("price", product.price);

      contenedor.appendChild(card);
    });
  });
};



export default {
  getPost,
  addPost,
};
