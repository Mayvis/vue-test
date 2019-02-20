import {
    mount
} from '@vue/test-utils';
import Counter from '../src/components/Counter';

describe('Counter', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Counter);
    });

    it('defaults to a counter of 0', () => {
        expect(wrapper.vm.count).toBe(0);
    });

    it('increments the count when the button is clicked', () => {
        expect(wrapper.vm.count).toBe(0);

        wrapper.find('button').trigger('click');

        expect(wrapper.vm.count).toBe(1);
    });

    it('presents the current count', () => {
        expect(wrapper.find('.count').html()).toContain(0);

        wrapper.find('button').trigger('click');

        expect(wrapper.find('.count').html()).toContain(1);
    });
});