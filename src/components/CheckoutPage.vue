<template>
    <div class="checkout container">
        <div>
            <h2>Оформлення замовлення</h2>
            <div class="checkout__personal">
                <h4>Ваші контактні дані</h4>
                <input class="checkout__input" type="text" placeholder="Ім'я" />
                <input
                    class="checkout__input"
                    type="text"
                    placeholder="Прізвище"
                />
            </div>
        </div>
    </div>
</template>
<script>
import NovaPoshtaService from '@/services/NovaPoshtaService' // Adjust the path based on your project structure

export default {
    data() {
        return {
            responseData: null,
        }
    },
    mounted() {
        // Example of using Nova Poshta API to get a list of cities
        NovaPoshtaService.post('/common/getCities', {
            modelName: 'Address',
            calledMethod: 'getCities',
            apiKey: 'fc532f0b68f563638171396db1bc8485', 
        })
            .then((response) => {
                console.log(response.data)
                this.responseData = response.data
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    },
}
</script>
