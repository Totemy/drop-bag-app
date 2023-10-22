<template>
    <div class="product">
        <div><button @click="goBack()">Go back</button></div>
        <div>
            <h2>{{ product.name }}</h2>
            <div>
                {{ product.description }}
            </div>
            <div>
                <button>Додати до кошика</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        productId: String,
        product: Object,
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
    },
}
</script>
