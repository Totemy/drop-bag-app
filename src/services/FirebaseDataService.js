import { query, getDocs, collectionGroup, getFirestore, doc, getDoc } from 'firebase/firestore';

export async function getCategory(categoryId) {
    const db = getFirestore();
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
export async function getProducts(productIdToFind) {
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
