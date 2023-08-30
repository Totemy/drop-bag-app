<template>
    <div class="admin-category">
        <div class="row">
            Add new Category
            <form @submit.prevent="AddCat" >
                <input id="name" type="text" placeholder="Name category">
                <input type="file" id="image" accept=".jpg, .png"  @change="previewImage" />
                <button type="submit" >Add</button>
            </form>
        </div>
        <div class="row">
            <div class="col">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cat, index) in Category" :key="cat.id">
                            <th>{{ index + 1 }}</th>
                            <td>{{ cat.name }}</td>
                            <td>
                                <button  @click="GetOneCategory(cat.id, cat.name)">
                                    Edit (not work)
                                </button>
                                <button  @click="DeleteCat(cat.id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import {
  collection,
  addDoc,
  getFirestore,
  query,
  getDocs,
  doc,
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "category",
  data() {
    return {
      cat: {
        name: "",
        image: "",
      },
      Category: [],
      DataCatID: {
        name: "",
        id: "",
        image: "",
      },
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    AddCat() {
      addDoc(
        collection(db, "categories"),
        {
          name: this.cat.name,
          image: this.cat.image
        },
        location.reload()
      );
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
    previewImage(event) {
      this.uploadValue = 0;
      this.img = null;
      this.imageData = event.target.files[0];
      this.AddImg();
    },
    GetOneCategory(id, name) {
      this.DataCatID.name = name;
      this.DataCatID.id = id;
    },
    async EditCategory() {
      const washingtonRef = doc(db, "categories", this.DataCatID.id);
      await updateDoc(washingtonRef, {
        name: this.DataCatID.name,
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async DeleteCat(id) {
      await deleteDoc(doc(db, "categories", id))
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getCategory() {
      const q = query(collection(db, "categories")),
        querySnapshot = await getDocs(q);
      this.Category = [];
      querySnapshot.forEach((doc) => {
        this.Category.push({
          id: doc.id,
          name: doc.data().name,
          image: doc.data().image,
        });
      });
    },
  },
};
</script>