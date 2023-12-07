<template>
    <div>
        <div class="catalog">
            <div class="container">
                <ul class="catalog-list">
                    <li v-for="product in localData" :key="product.id" class="catalog-item">
                        <div class="catalog-content">
                            <div class="catalog-img-wrap">
                                <img
                                    :src="product.images[0]"
                                    alt=""
                                    class="catalog-img"
                                    height="549"
                                    width="412"
                                />
                            </div>
                            <div class="catalog-info">
                                <p class="catalog-subtitle">{{product.name}}</p>
                                <p class="catalog-text">{{ product.description }}</p>
                                <p class="catalog-price">{{ product.price }}</p>
                            </div>
                            <button type="button" class="catalog-btn" 
                            :to="{
                                name:'Product',
                                params:{
                                    id:product.id,
                                    name:product.name,
                                    image:product.images,
                                    price:product.price,
                                    desc: product.description,
                                }
                            }"
                            >
                                Buy
                            </button>
                        </div>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { DataService, EventBus } from '../../services/DataService';
export default {
    data(){
        return{
            localData:[]
        }
    },
    created(){
        this.localData = DataService.data;
        EventBus.$on('data-updated', (newData) => {
            this.localData = newData;
        });
    }
}
</script>