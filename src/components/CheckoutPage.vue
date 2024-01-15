<template>
    <div class="checkout container">
        <div>
            <h2>Оформлення замовлення</h2>
            <div class="checkout__personal">
                <h4>Прізвище ім'я по батькові</h4>
                <input class="checkout__input" type="text" placeholder="ПІБ" v-model="name" />
                <h4>
                    Номер телефону
                </h4>
                <input
                    id="phoneNumber"
                    class="checkout__input"
                    type="tel"
                    :value="formattedPhoneNumber"
                    @input="handleInput"
                    @keydown="handleKeyDown"
                />
                <h4>Місто проживання</h4>
                <input class="checkout__input" type="text"  v-model="city"/>

            </div>
            <div class="checkout__footer">
                <div>
                    <h2> Всього: {{sum}} </h2>
                    <div>
                        <button class="btn btn__offer" @click="sendCheckout()">Оформити замовлення</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Inputmask from 'inputmask';
import { mapGetters } from 'vuex';
import  emailjs from '@emailjs/browser'
export default {
    data() {
        return {
            phoneNumber: '',
            name: '',
            city: '',
            sum: null,
        }
    },
    computed: {
        ...mapGetters('cart', ['cartItems']),
        formattedPhoneNumber() {
            return this.phoneNumber.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
        },
    },
    mounted() {
        this.initializeInputMask();
    },
    methods: {
        initializeInputMask() {
            Inputmask({
                mask: '+380 99 999 99 99',
                clearIncomplete: true,
            }).mask(this.$el.querySelector('#phoneNumber'));
        },
        handleInput(event) {
            if (!event.target.value.startsWith('+380')) {
                event.target.value = '+380';
            }
            this.phoneNumber = event.target.value;
        },
        handleKeyDown(event) {
            const cursorPosition = event.target.selectionStart;
            if (cursorPosition <= 5 && event.key === 'Backspace') {
                event.preventDefault();
            }
        },
        sumOfProducts(){
            this.sum = this.cartItems.reduce((total, item) => {
                const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                return total + price;
            }, 0);
        },
        sendCheckout(){
            const items = this.cartItems.map(offerItems => {
                // eslint-disable-next-line no-unused-vars
                const { images, ...itemWithoutUnwantedFields } = offerItems;
                return itemWithoutUnwantedFields;
            });
            let params = {
                name: this.name,
                offer: JSON.stringify(items),
                city: this.city,
                phone: this.formattedPhoneNumber,
            };
            emailjs.send('service_pq1z0dp', 'template_7bdafnn', params, '_VH4zMsf2RUD93h6l')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                    console.log('FAILED...', error);
                });
        }
    },
}
</script>
