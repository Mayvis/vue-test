import {
    mount
} from '@vue/test-utils';
import CouponCode from '../src/components/CouponCode.vue';

describe('CouponCode', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(CouponCode);

        wrapper.setData({
            coupon: {
                code: "50OFF",
                message: "50% off!",
                discount: 50
            },
        });
    });

    it('accepts to a coupon code', () => {
        expect(wrapper.contains('input.coupon-code')).toBe(true);
    });

    it('validates a user-provided coupon code', () => {
        enterCouponCode('50OFF');

        expect(wrapper.html()).toContain('Coupon Redeemed: 50% off!');
    });

    it('validates a fake coupon code', () => {
        enterCouponCode('NOTREAL');

        expect(wrapper.html()).toContain('Invalid Coupon Code');
    });

    it('broadcasts the percentage discount when a valid coupon is applied', () => {
        enterCouponCode('50OFF');

        expect(wrapper.emitted().applied).toBeTruthy();
        expect(wrapper.emitted().applied[0]).toEqual([50]);
    });

    function enterCouponCode(code) {
        let couponCode = wrapper.find('input.coupon-code');

        couponCode.element.value = code;
        couponCode.trigger('input');
    }
});