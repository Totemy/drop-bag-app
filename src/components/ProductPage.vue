<template>
    <div class="product">
        <div><button>Go back</button></div>
        <div>
            <h2>{{ name }}</h2>
            <div>
                {{ description }}
            </div>
            <div>
                <p>{{ price }} Грн</p>
                <button>Додати до кошика</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        name: String,
        description: String,
        image: String,
        price: String
    },
};
</script>
