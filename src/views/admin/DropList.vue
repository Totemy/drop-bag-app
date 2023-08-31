<template>
    <div class="droplist">
      <table>
        <thead>
          <tr>
            <th v-for="(value, key) in xmlData" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in xmlData" :key="index">
            <td v-for="(item, key) in value" :key="key">{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import xml2js from 'xml2js';
  
  export default {
    name: 'XmlTable',
    setup() {
      const xmlData = ref({});
  
      onMounted(async () => {
        try {
          const response = await fetch('https://www.websklad.biz.ua/wp-content/uploads/randomize_prom_.xml');
          const xmlText = await response.text();
  
          xml2js.parseString(xmlText, (err, result) => {
            if (err) {
              console.error('Error parsing XML:', err);
              return;
            }
            xmlData.value = result;
          });
        } catch (error) {
          console.error('Error fetching XML:', error);
        }
      });
  
      return {
        xmlData
      };
    }
  };
  </script>
  