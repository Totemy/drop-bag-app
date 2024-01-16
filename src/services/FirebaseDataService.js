import { query, getDocs, collectionGroup, getFirestore } from 'firebase/firestore';

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
