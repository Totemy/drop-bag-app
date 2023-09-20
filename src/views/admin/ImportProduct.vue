<template>
    <div>
        <form @submit.prevent="checkData">
            <input
                id="xmlLink"
                v-model="xmlLink"
                type="text"
                placeholder="Input link"
            />
            <button type="submit">Check datas</button>
        </form>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Parent Id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in xmlItems" :key="item.id">
                        <td> {{ item.id }}</td>
                        <td> {{ item.name }}</td>
                        <td> {{ item.price }}</td>
                        <td> {{ item.categodyId }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import xml2js from "xml2js";
import {
  collection,
  getFirestore,
  query,
  getDocs,
  firestore,
} from "firebase/firestore";
const db = getFirestore();
const categoriesCollection = firestore.collection("categories");
export default {
    data: function () {
        return {
            xmlLink: "",
            xmlItems: "",
            parsedData: null,
            categories: [],
            categoryIdLink: null,
        };
    },
    created() {
        this.getCategory();
    },
    methods: {
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
        checkData() {
            axios
                .get(`https://cors-anywhere.herokuapp.com/${this.xmlLink}`)
                .then((response) => {
                    this.parseXML(response.data).then((data) => {
                        this.xmlItems = data;
                    });
                    
                });
        },
        
        parseXML(data) {
            return new Promise((resolve) => {
                var k = "";
                var arr = [],
                    parser = new xml2js.Parser({
                        trim: true,
                        explicitArray: true
                    });
                parser.parseString(data, function (err, result) {
                    var obj = result.yml_catalog;
                    for (k in obj.shop[0].offers[0].offer) {
                        var item = obj.shop[0].offers[0].offer[k];
                        arr.push({
                            name: item.name,
                            id: item.$.id,
                            groupId: item.$.group_id,
                            categodyId: item.categoryId,
                            description:item.description,
                            param:item.param,
                            price: item.price,
                            vendor: item.vendor,
                            vendorcode:item.vendorCode,
                            url: item.url,
                            picture: item.picture,
                            disabled: item.disabled
                        });
                        categoriesCollection
                        .where("categoryId", "==", arr[k].categodyId)
                            .get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    const subcollectionRef = doc.ref.collection("products");
                                    subcollectionRef.add({
                                        name: this.prod.name
                                    })
                            })
                        })
                    }
                    resolve(arr);
                });
            });
        }
    }
};
</script>
