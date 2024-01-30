import Vue from 'vue';

export const EventBus = new Vue();

export const DataService = {
  data: { products: [], categories: [] },

  setData(newData) {
    this.data = newData;
    EventBus.$emit('data-updated', newData);
  },
};
