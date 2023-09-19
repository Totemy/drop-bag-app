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
export default {
    data: function () {
        return {
            xmlLink: "",
            xmlItems: "",
            parsedData: null
        };
    },
    methods: {
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
                    console.log(obj);
                    console.log(obj.shop[0].offers[0].offer[1]);  //display element foreach replace 1 to k

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
                    }
                    resolve(arr);
                });
            });
        }
    }
};
</script>
