<template>
  <span ref="CountTo">{{count}}</span>
</template>

<script>
export default {
  name: "CountTo",
  props:{
    amount:{
      type:Number,
      default:1000
    }
  },
  data() {
    return {
      count: 0,
      rqf: null
    };
  },
  mounted() {
    function step() {
      this.count = Math.floor(this.count  + (this.amount*10)/(0.6*1000));
      if (this.count < this.amount) {
        this.rqf = window.requestAnimationFrame(step.bind(this));
      }else{
        this.count = this.amount;
      }
    }
    this.rqf = window.requestAnimationFrame(step.bind(this));
  },
  destroyed() {
    window.cancelAnimationFrame(this.rqf);
  }
};
</script>