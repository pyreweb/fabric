import FInput from '../../atoms/FInput/FInput.vue.js';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let idCounter = 0;

var script = {
	name: 'FFormField',
	components: {
		FInput
	},
	props: {
		id: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: ''
		},
		value: {
			type: [String, Number],
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'medium'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		hint: {
			type: String,
			default: ''
		},
		errorMessage: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			generatedId: ''
		};
	},
	computed: {
		inputId() {
			return this.id || this.generatedId;
		}
	},
	created() {
		if (!this.id) {
			this.generatedId = `f-form-field-${++idCounter}`;
		}
	}
};

export { script as default };
