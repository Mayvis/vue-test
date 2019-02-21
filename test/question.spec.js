import {
    mount
} from '@vue/test-utils';
import Question from '../src/components/Question.vue';
import moxios from 'moxios';

describe('Question', () => {
    let wrapper;

    beforeEach(() => {
        moxios.install();

        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body',
                }
            }
        });
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('presents the body and title', () => {
        see('The title');
        see('The body');
    });

    it('can be edited', () => {
        expect(wrapper.contains('input[name=title]')).toBe(false);

        click('#edit');

        expect(wrapper.find('input[name=title]').element.value).toBe('The title');
    });

    it('hides the edit button during edit mode', () => {
        expect(wrapper.contains('#edit')).toBe(true);

        click('#edit');

        expect(wrapper.contains('#edit')).toBe(false);
    });

    it('updates the question after being edited', (done) => {
        click('#edit');

        type('input[name=title]', 'Changed title');
        type('textarea[name=body]', 'Changed body');

        click('#update');

        moxios.stubRequest(/questions\/\d+/, {
            status: 200,
            responseText: {
                title: 'Changed title',
                body: 'Changed body',
            }
        });

        see('Changed title');
        see('Changed body');

        moxios.wait(() => {
            see('Your question has been updated');

            done();
        });
    });

    it('can cancel out of edit mode', () => {
        click('#edit');

        type('input[name=title]', 'Changed title');

        click('#cancel');

        see('The title');
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
});