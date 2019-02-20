<template>
  <div>
    <input type="text" class="coupon-code" v-model="code" @input="validate">
    <p v-if="valid">Coupon Redeemed: {{ message }}</p>
    <p v-else>Invalid Coupon Code</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: "",
      coupons: [
        {
          code: "50OFF",
          message: "50% off!",
          discount: 50
        },
        {
          code: "FREE",
          message: "Entirely free",
          discount: 100
        }
      ],
      valid: false
    };
  },

  computed: {
    selectCoupon() {
      return this.coupons.find(coupon => coupon.code == this.code);
    },

    message() {
      return this.selectCoupon.message;
    }
  },

  methods: {
    validate() {
      this.valid = !!this.selectCoupon;

      if (this.valid) {
        let discount = this.selectCoupon.discount;

        this.$emit("applied", discount);
      }
    }
  }
};
</script>