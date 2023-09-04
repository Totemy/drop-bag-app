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
import axios from 'axios';
import xml2js from 'xml2js';
export default {
  
    mounted(){ 
     //xml file calling
      axios.get('assets/users.xml')
        .then(response => {
          this.parseXML(response.data)  
              .then((data) => {  
                this.xmlItems = data;  
              });       
        })
      
    },
    methods: {
      //xml file data parsing
      parseXML(data) {  
                 return  new Promise(resolve => {  
                      var k=""; 
                       var arr = [],  
                      parser = new xml2js.Parser(  
                        {  
                          trim: true,  
                          explicitArray: true  
                        });  
                    parser.parseString(data, function (err, result) {  
                      var obj = result.Employee;  
                      for (k in obj.emp) {  
                        var item = obj.emp[k];  
                        arr.push({  
                          id: item.id[0],  
                          name: item.name[0],  
                          email: item.email[0],  
                          
                        });  
                      }  
                      resolve(arr);  
                    });  
                  });  
              }
    },
      data: function() {
  return {
    xmlItems:[]
  }
}  
}
</script>