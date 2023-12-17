<template>
    <div class="carousel">
        <div  class="carousel__slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div
            v-for="(image, index) in images"
            :key="index"
            :class="{ active: index === currentIndex }"
        >
            <img class="carousel__img" :src="image" alt="carousel__img" />
        </div>
        </div>
        
        <div class="carousel__buttons">
            <button class="prev" @click="prevImage">&#10094;</button>
            <button class="next" @click="nextImage">&#10095;</button>
        </div>
       
    </div>
</template>
<script>
export default {
    props: {
        images: Array,
        currentIndex: Number,
    },
    methods: {
        nextImage() {
            this.$emit('nextImage');
        },
        prevImage() {
            this.$emit('prevImage');
        },
    },
}
</script>
