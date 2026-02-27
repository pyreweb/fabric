import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FDatePicker from './FDatePicker.vue';

describe('FDatePicker', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(FDatePicker);
	});

	afterEach(() => {
		wrapper.destroy();
	});

	it('renders correctly with default props', () => {
		expect(wrapper.find('input').exists()).toBe(true);
		expect(wrapper.find('.relative').exists()).toBe(true);
	});

	it('displays placeholder', () => {
		const customPlaceholder = 'Choisir une date';
		wrapper = mount(FDatePicker, {
			propsData: { placeholder: customPlaceholder }
		});
		expect(wrapper.find('input').attributes('placeholder')).toBe(
			customPlaceholder
		);
	});

	it('opens calendar when input is clicked', async () => {
		const input = wrapper.find('input');
		await input.trigger('click');
		expect(wrapper.vm.isOpen).toBe(true);
		expect(wrapper.find('[role="dialog"]').isVisible()).toBe(true);
	});

	it('closes calendar on escape key', async () => {
		const input = wrapper.find('input');
		await input.trigger('click');
		expect(wrapper.vm.isOpen).toBe(true);

		await wrapper.trigger('keydown.escape');
		expect(wrapper.vm.isOpen).toBe(false);
	});

	it('applies disabled state', () => {
		wrapper = mount(FDatePicker, {
			propsData: { disabled: true }
		});
		expect(wrapper.find('input').attributes('disabled')).toBeDefined();
		expect(wrapper.find('input').classes()).toContain('cursor-not-allowed');
	});

	it('applies readonly state', () => {
		wrapper = mount(FDatePicker, {
			propsData: { readonly: true }
		});
		expect(wrapper.find('input').attributes('readonly')).toBeDefined();
	});

	it('applies error styles', () => {
		wrapper = mount(FDatePicker, {
			propsData: { error: true }
		});
		expect(wrapper.find('input').classes().join(' ')).toContain(
			'border-danger'
		);
	});

	it('initializes with provided date value in single mode', () => {
		const testDate = new Date(2024, 0, 15);
		wrapper = mount(FDatePicker, {
			propsData: {
				value: testDate,
				mode: 'single'
			}
		});
		expect(wrapper.vm.selectedDate).toBeTruthy();
		expect(wrapper.vm.selectedDate.getDate()).toBe(15);
		expect(wrapper.vm.selectedDate.getMonth()).toBe(0);
		expect(wrapper.vm.selectedDate.getFullYear()).toBe(2024);
	});

	it('initializes with provided date range in range mode', () => {
		const startDate = new Date(2024, 0, 10);
		const endDate = new Date(2024, 0, 20);
		wrapper = mount(FDatePicker, {
			propsData: {
				value: [startDate, endDate],
				mode: 'range'
			}
		});
		expect(wrapper.vm.selectedRangeStart).toBeTruthy();
		expect(wrapper.vm.selectedRangeEnd).toBeTruthy();
	});

	it('formats date according to format prop', () => {
		const testDate = new Date(2024, 0, 15);
		wrapper = mount(FDatePicker, {
			propsData: {
				value: testDate,
				format: 'DD/MM/YYYY'
			}
		});
		expect(wrapper.vm.displayValue).toBe('15/01/2024');
	});

	it('displays time picker when showTimePicker is true', async () => {
		wrapper = mount(FDatePicker, {
			propsData: { showTimePicker: true }
		});
		const input = wrapper.find('input');
		await input.trigger('click');
		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain('Heures');
		expect(wrapper.text()).toContain('Minutes');
	});

	it('navigates to previous month', async () => {
		const input = wrapper.find('input');
		await input.trigger('click');
		await wrapper.vm.$nextTick();

		const initialMonth = wrapper.vm.displayMonth;
		wrapper.vm.previousMonth();
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.displayMonth).not.toBe(initialMonth);
	});

	it('navigates to next month', async () => {
		const input = wrapper.find('input');
		await input.trigger('click');
		await wrapper.vm.$nextTick();

		const initialMonth = wrapper.vm.displayMonth;
		wrapper.vm.nextMonth();
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.displayMonth).not.toBe(initialMonth);
	});

	it('disables dates before minDate', () => {
		const minDate = new Date(2024, 0, 15);
		wrapper = mount(FDatePicker, {
			propsData: { minDate }
		});

		const testDay = {
			date: 10,
			month: 0,
			year: 2024,
			isCurrentMonth: true
		};

		expect(wrapper.vm.isDayDisabled(testDay)).toBe(true);
	});

	it('disables dates after maxDate', () => {
		const maxDate = new Date(2024, 0, 15);
		wrapper = mount(FDatePicker, {
			propsData: { maxDate }
		});

		const testDay = {
			date: 20,
			month: 0,
			year: 2024,
			isCurrentMonth: true
		};

		expect(wrapper.vm.isDayDisabled(testDay)).toBe(true);
	});

	it('disables specific dates from disabledDates array', () => {
		const disabledDates = [new Date(2024, 0, 15)];
		wrapper = mount(FDatePicker, {
			propsData: { disabledDates }
		});

		const testDay = {
			date: 15,
			month: 0,
			year: 2024,
			isCurrentMonth: true
		};

		expect(wrapper.vm.isDayDisabled(testDay)).toBe(true);
	});

	it('emits input event when date is selected in single mode', async () => {
		const input = wrapper.find('input');
		await input.trigger('click');

		const testDay = {
			date: 15,
			month: 0,
			year: 2024,
			isCurrentMonth: true
		};

		wrapper.vm.selectDate(testDay);
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('input')).toBeTruthy();
		expect(wrapper.emitted('change')).toBeTruthy();
	});

	it('handles range selection correctly', async () => {
		wrapper = mount(FDatePicker, {
			propsData: { mode: 'range' }
		});

		const input = wrapper.find('input');
		await input.trigger('click');

		const startDay = {
			date: 10,
			month: 0,
			year: 2024,
			isCurrentMonth: true
		};

		const endDay = {
			date: 20,
			month: 0,
			year: 2024,
			isCurrentMonth: true
		};

		wrapper.vm.selectDate(startDay);
		expect(wrapper.vm.selectedRangeStart).toBeTruthy();
		expect(wrapper.vm.selectedRangeEnd).toBeFalsy();

		wrapper.vm.selectDate(endDay);
		expect(wrapper.vm.selectedRangeStart).toBeTruthy();
		expect(wrapper.vm.selectedRangeEnd).toBeTruthy();
	});

	it('uses custom month and day names', () => {
		const customMonthNames = [
			'Jan',
			'Fév',
			'Mar',
			'Avr',
			'Mai',
			'Jui',
			'Jul',
			'Aoû',
			'Sep',
			'Oct',
			'Nov',
			'Déc'
		];
		const customDayNames = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

		wrapper = mount(FDatePicker, {
			propsData: {
				monthNames: customMonthNames,
				dayNames: customDayNames
			}
		});

		expect(wrapper.vm.monthNames).toEqual(customMonthNames);
		expect(wrapper.vm.dayNames).toEqual(customDayNames);
	});

	it('respects firstDayOfWeek prop', () => {
		wrapper = mount(FDatePicker, {
			propsData: { firstDayOfWeek: 0 } // Sunday
		});

		expect(wrapper.vm.firstDayOfWeek).toBe(0);
	});

	it('generates calendar days correctly', () => {
		wrapper.vm.displayMonth = 0; // January
		wrapper.vm.displayYear = 2024;
		wrapper.vm.updateCalendar();

		expect(wrapper.vm.calendarDays.length).toBeGreaterThan(0);
		expect(wrapper.vm.calendarDays.length).toBe(42); // 6 weeks * 7 days
	});

	it('generates 29 days for February on a leap year', () => {
		wrapper.vm.displayMonth = 1; // February
		wrapper.vm.displayYear = 2024; // leap year
		wrapper.vm.updateCalendar();

		const feb29 = wrapper.vm.calendarDays.find(
			(d: { date: number; month: number; year: number; isCurrentMonth: boolean }) =>
				d.date === 29 && d.month === 1 && d.year === 2024 && d.isCurrentMonth
		);
		expect(feb29).toBeDefined();
	});

	it('allows selecting February 29 on a leap year', () => {
		wrapper.vm.displayMonth = 1; // February
		wrapper.vm.displayYear = 2024; // leap year
		wrapper.vm.updateCalendar();

		const feb29 = wrapper.vm.calendarDays.find(
			(d: { date: number; month: number; year: number; isCurrentMonth: boolean }) =>
				d.date === 29 && d.month === 1 && d.year === 2024 && d.isCurrentMonth
		);

		expect(wrapper.vm.isDayDisabled(feb29)).toBe(false);

		wrapper.vm.selectDate(feb29);

		expect(wrapper.vm.selectedDate).not.toBeNull();
		expect(wrapper.vm.selectedDate.getDate()).toBe(29);
		expect(wrapper.vm.selectedDate.getMonth()).toBe(1);
		expect(wrapper.vm.selectedDate.getFullYear()).toBe(2024);
		expect(wrapper.emitted('input')).toBeTruthy();
	});

	it('parses ISO date string 2024-02-29 as local time (leap year)', () => {
		wrapper = mount(FDatePicker, {
			propsData: { value: '2024-02-29' }
		});

		expect(wrapper.vm.selectedDate).not.toBeNull();
		expect(wrapper.vm.selectedDate.getDate()).toBe(29);
		expect(wrapper.vm.selectedDate.getMonth()).toBe(1);
		expect(wrapper.vm.selectedDate.getFullYear()).toBe(2024);
		expect(wrapper.vm.displayValue).toBe('29/02/2024');
	});

	it('returns null when parsing invalid date 2023-02-29 (non-leap year)', () => {
		wrapper = mount(FDatePicker, {
			propsData: { value: '2023-02-29' }
		});

		expect(wrapper.vm.selectedDate).toBeNull();
	});
});
