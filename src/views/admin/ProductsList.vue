<template>
    <div class="admin-product">
        <div class="row">
            <button> Add new Product</button>
            <div>
                <form @submit.prevent="AddProd">
                    <input  id="name"
                        v-model="prod.name"
                        type="text"
                        placeholder="Name Product">
                    <input id="desc"
                        v-model="prod.description"
                        type="text"
                        placeholder="Description">
                    <input id="price"
                        v-model="prod.price"
                        type="number"
                        placeholder="price">
                </form>
                <div>
                    <select id="category" v-model="categoryId">
                        <option  v-for="category in categories"
                                :key="category.id"
                                :value="category.id"
                            >
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <input type="file" id="image" accept=".jpg, .png"  @change="previewImage" />
                <p variant="success"
                :value="messageSuccess"
                show
                v-if="messageSuccess === 'Added'">Added</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(Prod, index) in Products" :key="Prod.id">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ Prod.name }}</td>
                            <td>
                                <img :src="Prod.image" alt="img" height="60px" width="60px" />
                            </td>
                            <td>{{ Prod.price }}DT</td>
                            <td>
                                <b-button
                                v-b-modal.modal-edit
                                variant="success"
                                class="me-2 p-2"
                                @click="GetOneProd(Prod.id, Prod.name)"
                                >
                                Edit
                                </b-button>
                                <button class="btn btn-danger p-2" @click="DeleteProd(Prod.id)">
                                Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--edit modal-->
    </div>
</template>
<script>
import {
  collection,
  addDoc,
  getFirestore,
  query,
  getDocs,
  collectionGroup,
  doc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const db = getFirestore();
export default {
  name: "AllProd",
  data() {
    return {
      prod: {
        name: "",
        description: "",
        price: "",
        image: "",
      },
      Products: [],
      DataProdID: {
        name: "",
        id: "",
      },
      categories: [],
      categoryId: null,

      uploadValue: 0,
      img: null,
      imageData: null,
      messageSuccess: "",
    };
  },
  created() {
    this.getProducts();
    this.getCategory();
  },
  methods: {
    AddProd() {
      addDoc(collection(db, `categories/${this.categoryId}/products`), {
        name: this.prod.name,
        description: this.prod.description,
        price: this.prod.price,
        image: this.img,
      })
        .then(() => {
          this.messageSuccess = "Added";
          location.reload();
        })
        .catch((error) => {
          console.error("Error adding product: ", error);
        });
    },
    AddImg() {
      // Upload Image here
      this.img = null;
      const storage = getStorage();
      // Create a child reference
      const imagesRef = ref(storage, "images");
      // imagesRef now points to 'images'
      // Child references can also take paths delimited by '/'
      const storageRef = ref(imagesRef, `${this.imageData.name}`);
      const uploadTask = uploadBytesResumable(storageRef, this.imageData);
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            this.img = url;
            // console.log(this.img);
          });
        }
      );
    },
    async getCategory() {
      const q = query(collection(db, "categories")),
        querySnapshot = await getDocs(q);
      this.categories = [];
      querySnapshot.forEach((doc) => {
        this.categories.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
    },
    async getProducts() {
      const sousCollectionRef = query(collectionGroup(db, `products`)),
        sousCollectionSnapshot = await getDocs(sousCollectionRef);
      this.Products = [];
      sousCollectionSnapshot.forEach((doc) => {
        this.Products.push({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          image: doc.data().image,
        });
      });
      // console.log(this.Products);
    },
    async EditProd() {
      const querySnapshot = await getDocs(
          collectionGroup(db, "products"),
          where("id", "==", this.DataProdID.id)
        ),
        matchingDocs = querySnapshot.docs;
      if (matchingDocs.length > 0) {
        const matchingDocRef = doc(db, matchingDocs[0].ref.path);
        console.log(matchingDocRef);
        await updateDoc(matchingDocRef, {
          name: this.DataProdID.name,
        });
        console.log("Document updated successfully!");
        location.reload();
      } else {
        console.log("No matching documents found.");
      }
    },
    GetOneProd(id, name) {
      this.DataProdID.name = name;
      this.DataProdID.id = id;
    },
    async DeleteProd(id) {
      const querySnapshot = await getDocs(
          collectionGroup(db, "products"),
          where("id", "==", id)
        ),
        matchingDocs = querySnapshot.docs;
      if (matchingDocs.length > 0) {
        const matchingDocRef = doc(db, matchingDocs[0].ref.path);
        await deleteDoc(matchingDocRef);
        location.reload();
      } else {
        console.log("No matching documents found.");
      }
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img = null;
      this.imageData = event.target.files[0];
      this.AddImg();
    },
  },
};
</script>