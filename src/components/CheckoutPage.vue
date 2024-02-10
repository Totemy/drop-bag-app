<template>
    <div class="checkout">
        <div class="checkout__row">

            <div class="checkout__personal">
                <h2>Оформлення замовлення</h2>
                <h4>Прізвище</h4>
                <input class="checkout__input" type="text" placeholder="Прізвище" v-model="name" />
                <h4>Ім'я</h4>
                <input class="checkout__input" type="text" placeholder="Ім'я" v-model="surname" />
                <h4>По батькові</h4>
                <input class="checkout__input" type="text" placeholder="По батькові" v-model="lastname" />

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
                <h4>Доставка Нова Пошта</h4>
                <div class="checkout__delivery">
                    <h5>Область</h5>
                    <input class="checkout__input" type="text"  v-model="region" @input="handleInputChangeCity" placeholder="Область"/>
                    <h5>Місто</h5>
                    <input class="checkout__input" type="text"  v-model="city" @input="handleInputChangeCity" placeholder="Місто/Населений пункт"/>
                    <h5>Номер відділення Нової Пошти</h5>
                    <input class="checkout__input" type="text"  v-model="number_np" @input="handleInputChangeCity" placeholder="Номер відділення"/>
                </div>
                <div class="checkout__footer">
                    <div>
                        <h2> Всього: {{sum}} </h2>
                        <div>
                            <button class="btn btn__offer" @click="sendCheckout()">Оформити замовлення</button>
                        </div>
                    </div>
                </div>
                <div>
                    <textarea class="checkout__input" type="text"  v-model="massage" @input="handleInputChangeCity" placeholder="Питання побажання"/>
                </div>
            </div>
            <div class="checkout__product">
                <h2> Ваше замовлення</h2>
                <div v-for="item in product" :key="item.id" class="checkout__item">
                    <h5>Назва : {{item.name}} </h5>
                    <div>
                        <img class="checkout__image" :src="item.images[0]" alt="">
                    </div>
                    <h5>Вартість : {{item.price}} грн</h5>
                    <h5>Розмір : {{item.size}}</h5>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import Inputmask from 'inputmask';
import { mapGetters } from 'vuex';
import  emailjs from '@emailjs/browser'
import {getAdress} from '@/services/NovaPoshtaService'
export default {
    data() {
        return {
            product:[],
            phoneNumber: '',
            name: '',
            surname:'',
            lastname:'',
            city: '',
            region: '',
            number_np: '',
            massage: '',
            sum: null,
            responseData: null,
            showModal: false,
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
        this.sumOfProducts();
        this.getProduct();
        //this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                this.responseData  = await getAdress();

                console.log(this.responseData)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        handleInputChangeCity(){

        },
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
        getProduct(){
            this.product = this.cartItems
        },
        sendCheckout(){
            const items = this.cartItems.map(offerItems => {
                // eslint-disable-next-line no-unused-vars
                const { images, ...itemWithoutUnwantedFields } = offerItems;
                return itemWithoutUnwantedFields;
            });
            let params = {
                name: this.name,
                surname: this.surname,
                lastname: this.lastname,
                offer: JSON.stringify(items),
                city: this.city,
                region: this.region,
                number_np: this.number_np,
                phone: this.formattedPhoneNumber,
                massage: this.massage
            };
            emailjs.send('service_pq1z0dp', 'template_7bdafnn', params, '_VH4zMsf2RUD93h6l')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Замовлення оформлене.')
                }, function(error) {
                    console.log('FAILED...', error);
                });
        }
    },
}
</script>
