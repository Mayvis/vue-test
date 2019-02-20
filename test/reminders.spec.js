import {
    mount
} from '@vue/test-utils';
import Reminders from '../src/components/Reminders.vue';

describe('Reminders', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Reminders);
    });

    it('hides the reminder list if there are none', () => {
        expect(wrapper.contains('ul')).toBe(false);
    });

    it('can add reminders', () => {
        addReminder('Go to the school');

        expect(remindersList()).toContain('Go to the school');
    });

    it('can remove any reminder', () => {
        addReminder('Go to the school');
        addReminder('Play some funny game');

        let deleteButton = wrapper.find('ul > li:first-child .remove');

        deleteButton.trigger('click');

        expect(remindersList()).not.toContain('Go to the school');
    });

    function addReminder(body) {
        let newReminders = wrapper.find('.new-reminders');

        newReminders.element.value = body;
        newReminders.trigger('input');

        wrapper.find('button').trigger('click');
    }

    function remindersList() {
        return wrapper.find('ul').text();
    }
});