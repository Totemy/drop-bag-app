<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".xml" />
    <table v-if="tableData.length > 0">
      <thead>
        <tr>
          <th v-for="(value, key) in tableData[0]" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td v-for="(value, key) in item" :key="key">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import xml2js from 'xml2js';

export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const xmlString = e.target.result;
          this.parseXml(xmlString);
        };
        reader.readAsText(file);
      }
    },
    parseXml(xmlString) {
      const parser = new xml2js.Parser({ explicitArray: false });
      parser.parseString(xmlString, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
        } else {
          const data = result.root; // Assuming the root element name is 'root'
          if (Array.isArray(data.item)) {
            this.tableData = data.item;
          } else {
            this.tableData = [data.item];
          }
        }
      });
    },
  },
};
</script>
