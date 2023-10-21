<template>
    <div>
        <h2>{{ name }}</h2>
    </div>
</template>
<script>
export default{
    props:{
        name: String,
        image: String,
        products: Object,
    }
}

</script>