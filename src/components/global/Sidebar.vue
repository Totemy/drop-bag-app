<template>
    <aside >
     <li>
        <ul>
            <router-link to="/sidebar/category"><button active>Category</button></router-link>
            <router-link to="/sidebar/products"><button >Products</button></router-link>
            <!-- <router-link to="/sidebar/order"><button v-if="user == null" >Order</button></router-link> -->
            <router-link to="/sidebar/profile"><button >Profile</button></router-link>
            <router-link to="/sidebar/droplist"><button >Droplist</button></router-link>
        </ul>
     </li>
    </aside>
  </template>
  <script>
  // import profile from "@/views/profile.vue";
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "sidebar",
    components: {
      // profile,
    },
  };
  </script>