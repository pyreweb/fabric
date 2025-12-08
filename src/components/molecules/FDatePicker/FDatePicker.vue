<template>
	<div :class="containerClasses" @keydown.escape="closeCalendar">
		<!-- Input Field -->
		<div class="relative">
			<input
				ref="input"
				type="text"
				:class="inputClasses"
				:value="displayValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				:aria-expanded="String(isOpen)"
				:aria-haspopup="'dialog'"
				@click="toggleCalendar"
				@focus="handleFocus"
				@blur="handleBlur"
				@keydown.down.prevent="openCalendar"
			/>
			<f-icon
				name="calendar"
				size="sm"
				:class="iconClasses"
				@click.native="!disabled && toggleCalendar()"
			/>
		</div>

		<!-- Calendar Dropdown -->
		<div
			v-show="isOpen"
			ref="calendar"
			:class="calendarClasses"
			role="dialog"
			aria-label="Sélecteur de date"
		>
			<!-- Header with Month/Year Navigation -->
			<div class="p-3 border-b border-neutral-200">
				<div class="flex items-center justify-between mb-2">
					<button
						type="button"
						:class="navButtonClasses"
						aria-label="Mois précédent"
						@click="previousMonth"
					>
						<f-icon name="chevron-left" size="sm" />
					</button>
					<div class="flex items-center gap-2">
						<select
							v-model="displayMonth"
							:class="selectClasses"
							@change="updateCalendar"
						>
							<option
								v-for="(month, index) in monthNames"
								:key="index"
								:value="index"
							>
								{{ month }}
							</option>
						</select>
						<select
							v-model="displayYear"
							:class="selectClasses"
							@change="updateCalendar"
						>
							<option v-for="year in yearRange" :key="year" :value="year">
								{{ year }}
							</option>
						</select>
					</div>
					<button
						type="button"
						:class="navButtonClasses"
						aria-label="Mois suivant"
						@click="nextMonth"
					>
						<f-icon name="chevron-right" size="sm" />
					</button>
				</div>
			</div>

			<!-- Calendar Grid -->
			<div class="p-3">
				<!-- Day Names -->
				<div class="grid grid-cols-7 gap-1 mb-2">
					<div
						v-for="day in dayNames"
						:key="day"
						class="text-xs font-medium text-neutral-600 text-center py-1"
					>
						{{ day }}
					</div>
				</div>

				<!-- Days Grid -->
				<div class="grid grid-cols-7 gap-1">
					<button
						v-for="(day, index) in calendarDays"
						:key="index"
						type="button"
						:class="getDayClasses(day)"
						:disabled="isDayDisabled(day)"
						@click="selectDate(day)"
						@mouseenter="handleDayHover(day)"
					>
						{{ day.date }}
					</button>
				</div>
			</div>

			<!-- Time Picker (if enabled) -->
			<div v-if="showTimePicker" class="p-3 border-t border-neutral-200">
				<div class="flex items-center justify-center gap-2">
					<div class="flex flex-col items-center">
						<label class="text-xs font-medium text-neutral-600 mb-1"
							>Heures</label
						>
						<div class="flex items-center gap-1">
							<button
								type="button"
								:class="timeButtonClasses"
								aria-label="Diminuer les heures"
								@click="decrementHour"
							>
								<f-icon name="chevron-up" size="sm" />
							</button>
							<input
								v-model.number="selectedHour"
								type="number"
								min="0"
								max="23"
								:class="timeInputClasses"
								@change="updateTime"
							/>
							<button
								type="button"
								:class="timeButtonClasses"
								aria-label="Augmenter les heures"
								@click="incrementHour"
							>
								<f-icon name="chevron-down" size="sm" />
							</button>
						</div>
					</div>
					<span class="text-lg font-bold text-neutral-400 mt-6">:</span>
					<div class="flex flex-col items-center">
						<label class="text-xs font-medium text-neutral-600 mb-1"
							>Minutes</label
						>
						<div class="flex items-center gap-1">
							<button
								type="button"
								:class="timeButtonClasses"
								aria-label="Diminuer les minutes"
								@click="decrementMinute"
							>
								<f-icon name="chevron-up" size="sm" />
							</button>
							<input
								v-model.number="selectedMinute"
								type="number"
								min="0"
								max="59"
								:class="timeInputClasses"
								@change="updateTime"
							/>
							<button
								type="button"
								:class="timeButtonClasses"
								aria-label="Augmenter les minutes"
								@click="incrementMinute"
							>
								<f-icon name="chevron-down" size="sm" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div
				v-if="mode === 'range' || showTimePicker"
				class="p-3 border-t border-neutral-200 flex justify-end gap-2"
			>
				<button
					type="button"
					:class="cancelButtonClasses"
					@click="closeCalendar"
				>
					Annuler
				</button>
				<button
					type="button"
					:class="applyButtonClasses"
					:disabled="!canApply"
					@click="applySelection"
				>
					Appliquer
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import FIcon from '../../atoms/FIcon/FIcon.vue';

let idCounter = 0;

export default {
	name: 'FDatePicker',
	components: {
		FIcon
	},
	props: {
		value: {
			type: [String, Date, Array],
			default: null
		},
		mode: {
			type: String,
			default: 'single',
			validator: (value) => ['single', 'range'].includes(value)
		},
		placeholder: {
			type: String,
			default: 'Sélectionner une date'
		},
		format: {
			type: String,
			default: 'DD/MM/YYYY'
		},
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		showTimePicker: {
			type: Boolean,
			default: false
		},
		minDate: {
			type: [String, Date],
			default: null
		},
		maxDate: {
			type: [String, Date],
			default: null
		},
		disabledDates: {
			type: Array,
			default: () => []
		},
		monthNames: {
			type: Array,
			default: () => [
				'Janvier',
				'Février',
				'Mars',
				'Avril',
				'Mai',
				'Juin',
				'Juillet',
				'Août',
				'Septembre',
				'Octobre',
				'Novembre',
				'Décembre'
			]
		},
		dayNames: {
			type: Array,
			default: () => ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
		},
		firstDayOfWeek: {
			type: Number,
			default: 1,
			validator: (value) => value >= 0 && value <= 6
		}
	},
	data() {
		return {
			isOpen: false,
			displayMonth: new Date().getMonth(),
			displayYear: new Date().getFullYear(),
			selectedDate: null,
			selectedRangeStart: null,
			selectedRangeEnd: null,
			hoverDate: null,
			selectedHour: 0,
			selectedMinute: 0,
			calendarDays: [],
			generatedId: `f-datepicker-${++idCounter}`
		};
	},
	computed: {
		containerClasses() {
			return 'relative w-full';
		},
		inputClasses() {
			const baseClasses =
				'block w-full font-sans border rounded transition-all duration-200 box-border focus:outline-none focus:ring-2 pr-10';

			const sizeClasses = {
				small: 'py-1.5 px-2.5 text-xs',
				medium: 'py-2.5 px-3.5 text-sm',
				large: 'py-3.5 px-4.5 text-base'
			};

			const stateClasses = this.error
				? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'
				: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20';

			const disabledClasses = this.disabled
				? 'bg-neutral-100 cursor-not-allowed opacity-70'
				: 'cursor-pointer';

			return [
				baseClasses,
				sizeClasses[this.size],
				stateClasses,
				disabledClasses
			]
				.filter(Boolean)
				.join(' ');
		},
		iconClasses() {
			const baseClasses =
				'absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400';
			const cursorClass = this.disabled
				? 'cursor-not-allowed'
				: 'cursor-pointer';
			return `${baseClasses} ${cursorClass}`;
		},
		calendarClasses() {
			return 'absolute z-50 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg min-w-[320px]';
		},
		navButtonClasses() {
			return 'p-1 rounded hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20';
		},
		selectClasses() {
			return 'px-2 py-1 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500/20';
		},
		timeButtonClasses() {
			return 'p-1 rounded hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20';
		},
		timeInputClasses() {
			return 'w-12 px-2 py-1 text-center text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500/20';
		},
		cancelButtonClasses() {
			return 'px-3 py-1.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20';
		},
		applyButtonClasses() {
			return 'px-3 py-1.5 text-sm font-medium text-white bg-primary-500 rounded hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed';
		},
		displayValue() {
			if (this.mode === 'single' && this.selectedDate) {
				return this.formatDate(this.selectedDate);
			} else if (
				this.mode === 'range' &&
				this.selectedRangeStart &&
				this.selectedRangeEnd
			) {
				return `${this.formatDate(this.selectedRangeStart)} - ${this.formatDate(
					this.selectedRangeEnd
				)}`;
			} else if (this.mode === 'range' && this.selectedRangeStart) {
				return this.formatDate(this.selectedRangeStart);
			}
			return '';
		},
		yearRange() {
			const currentYear = new Date().getFullYear();
			const years = [];
			for (let i = currentYear - 100; i <= currentYear + 10; i++) {
				years.push(i);
			}
			return years;
		},
		canApply() {
			if (this.mode === 'range') {
				return this.selectedRangeStart && this.selectedRangeEnd;
			}
			return this.selectedDate !== null;
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(newValue) {
				this.initializeFromValue(newValue);
			}
		},
		isOpen(newValue) {
			if (newValue) {
				this.$nextTick(() => {
					this.updateCalendar();
					document.addEventListener('click', this.handleClickOutside);
				});
			} else {
				document.removeEventListener('click', this.handleClickOutside);
			}
		}
	},
	beforeDestroy() {
		document.removeEventListener('click', this.handleClickOutside);
	},
	methods: {
		initializeFromValue(value) {
			if (!value) {
				this.selectedDate = null;
				this.selectedRangeStart = null;
				this.selectedRangeEnd = null;
				return;
			}

			if (this.mode === 'single') {
				this.selectedDate = this.parseDate(value);
				if (this.selectedDate && this.showTimePicker) {
					this.selectedHour = this.selectedDate.getHours();
					this.selectedMinute = this.selectedDate.getMinutes();
				}
			} else if (
				this.mode === 'range' &&
				Array.isArray(value) &&
				value.length === 2
			) {
				this.selectedRangeStart = this.parseDate(value[0]);
				this.selectedRangeEnd = this.parseDate(value[1]);
			}
		},
		parseDate(value) {
			if (value instanceof Date) {
				return value;
			}
			if (typeof value === 'string') {
				return new Date(value);
			}
			return null;
		},
		formatDate(date) {
			if (!date) return '';

			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');

			let formatted = this.format
				.replace('DD', day)
				.replace('MM', month)
				.replace('YYYY', year);

			if (this.showTimePicker) {
				formatted += ` ${hours}:${minutes}`;
			}

			return formatted;
		},
		toggleCalendar() {
			if (this.disabled || this.readonly) return;
			this.isOpen = !this.isOpen;
		},
		openCalendar() {
			if (this.disabled || this.readonly) return;
			this.isOpen = true;
		},
		closeCalendar() {
			this.isOpen = false;
			this.hoverDate = null;
		},
		handleFocus(event) {
			this.$emit('focus', event);
		},
		handleBlur(event) {
			this.$emit('blur', event);
		},
		handleClickOutside(event) {
			if (
				this.$el &&
				!this.$el.contains(event.target) &&
				event.target instanceof Node
			) {
				this.closeCalendar();
			}
		},
		updateCalendar() {
			const year = this.displayYear;
			const month = this.displayMonth;
			const firstDay = new Date(year, month, 1);
			const lastDay = new Date(year, month + 1, 0);
			const daysInMonth = lastDay.getDate();

			// Adjust first day based on firstDayOfWeek prop
			let firstDayOfWeek = firstDay.getDay();
			firstDayOfWeek = (firstDayOfWeek - this.firstDayOfWeek + 7) % 7;

			const days = [];

			// Add previous month days
			const prevMonthLastDay = new Date(year, month, 0).getDate();
			for (let i = firstDayOfWeek - 1; i >= 0; i--) {
				days.push({
					date: prevMonthLastDay - i,
					month: month - 1,
					year: month === 0 ? year - 1 : year,
					isCurrentMonth: false
				});
			}

			// Add current month days
			for (let i = 1; i <= daysInMonth; i++) {
				days.push({
					date: i,
					month: month,
					year: year,
					isCurrentMonth: true
				});
			}

			// Add next month days to complete the grid
			const remainingDays = 42 - days.length;
			for (let i = 1; i <= remainingDays; i++) {
				days.push({
					date: i,
					month: month + 1,
					year: month === 11 ? year + 1 : year,
					isCurrentMonth: false
				});
			}

			this.calendarDays = days;
		},
		previousMonth() {
			if (this.displayMonth === 0) {
				this.displayMonth = 11;
				this.displayYear--;
			} else {
				this.displayMonth--;
			}
			this.updateCalendar();
		},
		nextMonth() {
			if (this.displayMonth === 11) {
				this.displayMonth = 0;
				this.displayYear++;
			} else {
				this.displayMonth++;
			}
			this.updateCalendar();
		},
		getDayClasses(day) {
			const baseClasses =
				'h-8 w-8 text-sm rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500/20';

			const classes = [baseClasses];

			if (!day.isCurrentMonth) {
				classes.push('text-neutral-300');
			}

			if (this.isDateSelected(day)) {
				classes.push(
					'bg-primary-500 text-white font-semibold hover:bg-primary-600'
				);
			} else if (this.isDateInRange(day)) {
				classes.push('bg-primary-100 text-primary-700');
			} else if (this.isToday(day)) {
				classes.push(
					'border-2 border-primary-500 text-primary-600 font-medium'
				);
			} else if (day.isCurrentMonth) {
				classes.push('hover:bg-neutral-100 text-neutral-700');
			}

			if (this.isDayDisabled(day)) {
				classes.push('cursor-not-allowed opacity-40');
			} else {
				classes.push('cursor-pointer');
			}

			return classes.join(' ');
		},
		isToday(day) {
			const today = new Date();
			return (
				day.date === today.getDate() &&
				day.month === today.getMonth() &&
				day.year === today.getFullYear()
			);
		},
		isDateSelected(day) {
			if (this.mode === 'single' && this.selectedDate) {
				return (
					day.date === this.selectedDate.getDate() &&
					day.month === this.selectedDate.getMonth() &&
					day.year === this.selectedDate.getFullYear()
				);
			} else if (this.mode === 'range') {
				const isStart =
					this.selectedRangeStart &&
					day.date === this.selectedRangeStart.getDate() &&
					day.month === this.selectedRangeStart.getMonth() &&
					day.year === this.selectedRangeStart.getFullYear();

				const isEnd =
					this.selectedRangeEnd &&
					day.date === this.selectedRangeEnd.getDate() &&
					day.month === this.selectedRangeEnd.getMonth() &&
					day.year === this.selectedRangeEnd.getFullYear();

				return isStart || isEnd;
			}
			return false;
		},
		isDateInRange(day) {
			if (this.mode !== 'range') return false;

			const date = new Date(day.year, day.month, day.date);

			if (this.selectedRangeStart && this.selectedRangeEnd) {
				return date > this.selectedRangeStart && date < this.selectedRangeEnd;
			} else if (this.selectedRangeStart && this.hoverDate) {
				const start = this.selectedRangeStart;
				const end = this.hoverDate;
				return (date > start && date < end) || (date < start && date > end);
			}

			return false;
		},
		isDayDisabled(day) {
			const date = new Date(day.year, day.month, day.date);

			if (this.minDate) {
				const min = this.parseDate(this.minDate);
				if (min && date < min) return true;
			}

			if (this.maxDate) {
				const max = this.parseDate(this.maxDate);
				if (max && date > max) return true;
			}

			if (this.disabledDates.length > 0) {
				return this.disabledDates.some((disabledDate) => {
					const disabled = this.parseDate(disabledDate);
					return (
						disabled &&
						date.getDate() === disabled.getDate() &&
						date.getMonth() === disabled.getMonth() &&
						date.getFullYear() === disabled.getFullYear()
					);
				});
			}

			return false;
		},
		selectDate(day) {
			if (this.isDayDisabled(day)) return;

			const selectedDate = new Date(day.year, day.month, day.date);

			if (this.showTimePicker) {
				selectedDate.setHours(this.selectedHour);
				selectedDate.setMinutes(this.selectedMinute);
			}

			if (this.mode === 'single') {
				this.selectedDate = selectedDate;
				if (!this.showTimePicker) {
					this.emitValue();
					this.closeCalendar();
				}
			} else if (this.mode === 'range') {
				if (
					!this.selectedRangeStart ||
					(this.selectedRangeStart && this.selectedRangeEnd)
				) {
					this.selectedRangeStart = selectedDate;
					this.selectedRangeEnd = null;
				} else {
					if (selectedDate < this.selectedRangeStart) {
						this.selectedRangeEnd = this.selectedRangeStart;
						this.selectedRangeStart = selectedDate;
					} else {
						this.selectedRangeEnd = selectedDate;
					}
				}
			}
		},
		handleDayHover(day) {
			if (
				this.mode === 'range' &&
				this.selectedRangeStart &&
				!this.selectedRangeEnd
			) {
				this.hoverDate = new Date(day.year, day.month, day.date);
			}
		},
		incrementHour() {
			this.selectedHour = (this.selectedHour + 1) % 24;
		},
		decrementHour() {
			this.selectedHour = (this.selectedHour - 1 + 24) % 24;
		},
		incrementMinute() {
			this.selectedMinute = (this.selectedMinute + 1) % 60;
		},
		decrementMinute() {
			this.selectedMinute = (this.selectedMinute - 1 + 60) % 60;
		},
		updateTime() {
			if (this.selectedDate && this.mode === 'single') {
				this.selectedDate.setHours(this.selectedHour);
				this.selectedDate.setMinutes(this.selectedMinute);
			}
		},
		applySelection() {
			this.emitValue();
			this.closeCalendar();
		},
		emitValue() {
			if (this.mode === 'single') {
				this.$emit('input', this.selectedDate);
				this.$emit('change', this.selectedDate);
			} else if (
				this.mode === 'range' &&
				this.selectedRangeStart &&
				this.selectedRangeEnd
			) {
				this.$emit('input', [this.selectedRangeStart, this.selectedRangeEnd]);
				this.$emit('change', [this.selectedRangeStart, this.selectedRangeEnd]);
			}
		}
	}
};
</script>
