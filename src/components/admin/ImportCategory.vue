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
            <h2>Import categories</h2>
            <button @click="AddCat">Add to database</button>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Parent Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in xmlItems" :key="item.id">
                        <td> {{ item.id }}</td>
                        <td> {{ item.parentid }}</td>
                        <td> {{ item.name }}</td>
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
  addDoc,
  getFirestore,
} from "firebase/firestore";
const db = getFirestore();
export default {
    data: function () {
        return {
            xmlLink: "",
            xmlItems: "",
            parsedData: null
        };
    },
    methods: {
        AddCat() {
            for (let k in this.xmlItems){
                var data = this.xmlItems[k];
                addDoc(
                    collection(db, "categories"),
                    {
                        categoryId: data[k].id,
                        name: data[k].name
                    }
                )
            }
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
                    for (k in obj.shop[0].categories[0].category) {
                        var item = obj.shop[0].categories[0].category[k];
                        arr.push({
                            id:item.$.id,
                            name:item._
                        });
                        addDoc(
                                collection(db, "categories"),
                                {
                                    categoryId: arr[k].id,
                                    name: arr[k].name
                                }
                            )
                            
                    }
                    resolve(arr);
                    alert('Database updated')
                });
            });
           
        }
    }
};
</script>
