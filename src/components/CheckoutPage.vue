<template>
    <div class="checkout container">
        <div>
            <h2>Оформлення замовлення</h2>
            <div class="checkout__personal">
                <h4>Прізвище ім'я по батькові</h4>
                <input class="checkout__input" type="text" placeholder="ПІБ" :value="name" />
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
                <input class="checkout__input" type="text"  :value="city"/> <!-- todo add api with all ukraine city -->
            </div>
        </div>
    </div>
</template>
<script>
import Inputmask from 'inputmask';
export default {
    data() {
        return {
            phoneNumber: '',
            name: '',
            city: ''
        }
    },
    computed: {
        formattedPhoneNumber() {
            return this.phoneNumber.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
        },
    },
    mounted() {
        this.initializeInputMask();
    },
    methods: {
        initializeInputMask() { //todo repair features
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
    },
}
</script>
