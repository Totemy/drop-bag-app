import Vue from 'vue';

export const EventBus = new Vue();

export const DataService = {
  data: [],

  setData(newData) {
    this.data = newData;
    EventBus.$emit('data-updated', newData);
  },
};
