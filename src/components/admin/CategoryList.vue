<template>
    <div class="admin-category">
        <div class="row">
            Add new Category
            <form @submit.prevent="AddCat" >
                <input id="name" v-model="cat.name" type="text" placeholder="Name category">
                <input id="image" v-model="cat.image" type="text" placeholder="Image source">
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
                            <td> <img :src=cat.image ></td>
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
const db = getFirestore();
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "category",
  data() {
    return {
      cat: {
        name: "",
        image: ""
      },
      Category: [],
      DataCatID: {
        name: "",
        id: "",
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
          image: this.cat.image,
        },
        location.reload()
      );
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