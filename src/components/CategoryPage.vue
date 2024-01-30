<template>
    <div>
        <h1>{{ category.name }}</h1>

    </div>
</template>
<script>
import { DataService, EventBus } from '@/services/DataService'

export default {
    data(){
        return{
            category:[],
            localData: [],
            categoryIdToFind: this.$route.params.categoryId,
        }
    },
    methods:{
        async getLocalData() {
            let localData = DataService.data.categories
            EventBus.$on('data-updated', (newData) => {
                this.localData = newData
            })
            this.category = localData.find(
                (category) => category.id == this.categoryIdToFind
            )
        },
    }
}
</script>