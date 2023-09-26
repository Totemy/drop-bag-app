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
  addDoc
} from "firebase/firestore";
const db = getFirestore();
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
                categoryId: doc.data().categoryId,
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
                var categoryData =  JSON.parse(JSON.stringify(this.categories));
                parser.parseString(data, function (err, result) {
                    var obj = result.yml_catalog;
                    console.log(obj.shop[0].offers[0].offer)
                    for (k in obj.shop[0].offers[0].offer) {
                        var item = obj.shop[0].offers[0].offer[k];
                        arr.push({
                            name: item.name,
                            id: item.$.id,
                            groupId: item.$.group_id,
                            categoryId: item.categoryId,
                            description:item.description,
                            param:item.param,
                            price: item.price,
                            vendor: item.vendor,
                            vendorcode:item.vendorCode,
                            url: item.url,
                            picture: item.picture,
                            disabled: item.disabled
                        });

                        JSON.parse(JSON.stringify(categoryData));
                        var foundObject = categoryData.find((search) => search.categoryId == arr[k].categoryId);
                        if(foundObject != null){
                            addDoc(collection(db, `categories/${foundObject.id}/products`), {
                                name: arr[k].name,
                                id: arr[k].id,
                               // groupId: arr[k].groupId,
                                categoryId: arr[k].categoryId,
                                description: arr[k].description,
                               // param: arr[k].param,
                               // vendor: arr[k].vendor,
                                vendorCode: arr[k].vendorcode,
                                url: arr[k].url,
                                picture: arr[k].picture,
                                price: arr[k].price
                               // disabled: arr[k].disabled,
                            });
                            console.log("Added to database")
                        }
                        else{
                            console.log("not found")
                            
                        }
                        
                    }
                    resolve(arr);
                });
            });
        }
    }
};
</script>
