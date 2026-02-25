//
//
//
//
//
//
//
//
//

var script = {
	name: 'FForm',
	methods: {
		handleSubmit(event) {
			this.$emit('submit', event);
		}
	}
};

export { script as default };
