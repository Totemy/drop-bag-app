import { query, getDocs, collectionGroup, getFirestore, doc, getDoc, collection } from 'firebase/firestore'
const db = getFirestore();
export async function getCategoryById(categoryId) {
    const categoryRef = doc(db, 'categories', categoryId);
    const docSnap = await getDoc(categoryRef);

    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            name: docSnap.data().name,
            image: docSnap.data().image,
        };
    } else {
        console.log('Document does not exist.');
        return null;
    }
}
export async function getCategory(){
    const db = getFirestore(),
        q = query(collection(db, "categories"));
    const querySnapshot = await getDocs(q);
    this.Category = [];
    querySnapshot.forEach((doc) => {
        this.Category.push({
            id: doc.id,
            name: doc.data().name,
            image: doc.data().image,
        });
    });
}
export  async  function  getProducts(){
    const sousCollectionRef = query(collectionGroup(db, `products`));
    const sousCollectionSnapshot = await getDocs(sousCollectionRef);
    this.Products = [];
    sousCollectionSnapshot.forEach((doc) => {
        this.Products.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            image: doc.data().picture[0],
        });
    });
}
export async function getProductsById(productIdToFind) {
    const db = getFirestore();
    const sousCollectionRef = query(collectionGroup(db, `products`));
    const sousCollectionSnapshot = await getDocs(sousCollectionRef);

    const Products = [];
    sousCollectionSnapshot.forEach((doc) => {
        Products.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            image: doc.data().image,
        });
    });

    const product = Products.find((product) => product.id === productIdToFind);

    return product;
}
