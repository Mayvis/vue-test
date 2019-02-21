import {
    mount
} from '@vue/test-utils';
import CountDown from '../src/components/CountDown.vue';
import moment from 'moment';
import sinon from 'sinon';

describe('CountDown', () => {
    let wrapper, clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers({
            global: global
        });

        wrapper = mount(CountDown, {
            propsData: {
                until: moment().add(10, 'seconds')
            }
        });
    });

    afterEach(() =>
        clock.restore()
    );

    it('renders a countdown timer', () => {
        see('0 Days');
        see('0 Hours');
        see('0 Minutes');
        see('10 Seconds');
    });

    it('reduces the countdown every seconds', (done) => {
        see('10 Seconds');

        clock.tick(1000);

        assertOnNextTick(() => {
            see('9 Seconds');
        }, done);
    });

    it('shows an expired message when the countdown has completed', (done) => {
        clock.tick(10000);

        assertOnNextTick(() => {
            see('Now expired');
        }, done);
    });

    it('shows an customized message when the countdown has completed', (done) => {
        wrapper.setProps({
            expiredText: "Contest is over"
        });

        clock.tick(10000);

        assertOnNextTick(() => {
            see('Contest is over');
        }, done);
    });

    it('broadcasts when the countdown is finished', (done) => {
        clock.tick(10000);

        assertOnNextTick(() => {
            expect(wrapper.emitted().finished).toBeTruthy();
        }, done);
    });

    it('clears the interval once completed', (done) => {
        clock.tick(10000);

        expect(wrapper.vm.now.getSeconds()).toBe(10);

        assertOnNextTick(() => {
            clock.tick(5000);

            expect(wrapper.emitted().finished).toBeTruthy();
        }, done);
    });

    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrap.html()).toContain(text);
    }

    let type = (selector, text) => {
        let node = wrapper.find(selector);

        node.element.value = text;
        node.trigger('input');
    }

    let click = (selector) => {
        wrapper.find(selector).trigger('click');
    }

    let assertOnNextTick = (callback, done) => {
        wrapper.vm.$nextTick(() => {
            try {
                callback();

                done();
            } catch (e) {
                done(e)
            }
        });
    }
})