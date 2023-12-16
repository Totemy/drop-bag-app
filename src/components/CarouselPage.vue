<template>
    <div class="carousel">
        <div
            v-for="(image, index) in images"
            :key="index"
            :class="{ active: index === currentIndex }"
        >
            <img :src="image" alt="carousel__img" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        images: Array,
        currentIndex: Number,
    },
}
</script>
