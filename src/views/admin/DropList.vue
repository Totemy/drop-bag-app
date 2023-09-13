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
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in xmlItems" :key="item.id">
                        <td>{{ item.id }}</td>
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
                    for (k in obj.offers) {
                        var item = obj.offer[k];
                        arr.push({
                            id: item.id,
                        });
                    }
                    resolve(arr);
                });
            });
        }
    }
};
</script>
