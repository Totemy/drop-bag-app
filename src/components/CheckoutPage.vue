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
                    <h2> Всього: {{summary}} </h2>
                    <div>
                        <button class="btn btn__offer">Оформити замовлення</button>
                    </div>
                </div>
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
    },
}
</script>
