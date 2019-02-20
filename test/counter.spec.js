import {
    mount
} from '@vue/test-utils';
import Counter from '../src/components/Counter.vue';

describe('Counter', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Counter);
    });

    it('defaults to a counter of 0', () => {
        expect(wrapper.vm.count).toBe(0);
    });

    it('increments the count when the increment button is clicked', () => {
        expect(wrapper.vm.count).toBe(0);

        wrapper.find('.increment').trigger('click');

        expect(wrapper.vm.count).toBe(1);
    });

    it('decrements the count when the decrement button is clicked', () => {
        expect(wrapper.vm.count).toBe(0);

        wrapper.setData({
            count: 5
        });

        wrapper.find('.decrement').trigger('click');

        expect(wrapper.vm.count).toBe(4);
    });

    it('never goes below 0', () => {
        expect(wrapper.vm.count).toBe(0);

        expect(wrapper.find('.decrement').isVisible()).toBe(false);

        wrapper.setData({count: 1});

        expect(wrapper.find('.decrement').isVisible()).toBe(true);

        expect(wrapper.vm.count).toBe(1);
    });

    it('presents the current count', () => {
        expect(wrapper.find('.count').html()).toContain(0);

        wrapper.find('button').trigger('click');

        expect(wrapper.find('.count').html()).toContain(1);
    });
});