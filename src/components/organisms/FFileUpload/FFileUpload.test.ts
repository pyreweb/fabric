import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FFileUpload, { type FFileUploadItem } from './FFileUpload.vue';

describe('FFileUpload', () => {
	it('renders correctly with default props', () => {
		const wrapper = mount(FFileUpload);
		expect(wrapper.find('input[type="file"]').exists()).toBe(true);
	});

	it('has hidden file input', () => {
		const wrapper = mount(FFileUpload);
		const input = wrapper.find('input[type="file"]');
		expect(input.classes()).toContain('sr-only');
	});

	it('displays drop zone', () => {
		const wrapper = mount(FFileUpload);
		expect(wrapper.text()).toContain('Glissez-déposez');
	});

	it('accepts custom accept types', () => {
		const wrapper = mount(FFileUpload, {
			propsData: { accept: '.pdf,.doc' }
		});
		expect(wrapper.find('input[type="file"]').attributes('accept')).toBe(
			'.pdf,.doc'
		);
	});

	it('allows multiple files when multiple is true', () => {
		const wrapper = mount(FFileUpload, {
			propsData: { multiple: true }
		});
		expect(
			wrapper.find('input[type="file"]').attributes('multiple')
		).toBeDefined();
	});

	it('disables input when disabled', () => {
		const wrapper = mount(FFileUpload, {
			propsData: { disabled: true }
		});
		expect(
			wrapper.find('input[type="file"]').attributes('disabled')
		).toBeDefined();
	});

	it('shows upload button when showButton is true', () => {
		const wrapper = mount(FFileUpload, {
			propsData: { showButton: true }
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(true);
	});

	it('shows hint when provided', () => {
		const wrapper = mount(FFileUpload, {
			propsData: { hint: 'Max 10MB' }
		});
		expect(wrapper.text()).toContain('Max 10MB');
	});

	it('displays file previews when files are present', () => {
		const wrapper = mount(FFileUpload, {
			propsData: {
				modelValue: [{ id: '1', name: 'test.pdf', status: 'success' }]
			}
		});
		expect(wrapper.findComponent({ name: 'FFilePreview' }).exists()).toBe(true);
	});

	it('emits update:modelValue event with typed FFileUploadItem[] when files are added', async () => {
		const wrapper = mount(FFileUpload);
		const input = wrapper.find('input[type="file"]');

		// Create a mock file
		const file = new File(['content'], 'test.txt', { type: 'text/plain' });
		const mockFileList = {
			0: file,
			length: 1,
			item: (index: number) => file
		};

		// Trigger change
		Object.defineProperty(input.element, 'files', {
			value: mockFileList,
			writable: false
		});
		await input.trigger('change');

		const emitted = wrapper.emitted('update:modelValue');
		expect(emitted).toBeTruthy();
		const payload = emitted![0][0] as FFileUploadItem[];
		expect(Array.isArray(payload)).toBe(true);
		expect(payload[0].file).toBe(file);
		expect(typeof payload[0].id).toBe('string');
		expect(payload[0].status).toBe('pending');
	});

	it('shows progress bar when uploading', () => {
		const wrapper = mount(FFileUpload, {
			propsData: {
				showProgress: true,
				modelValue: [{ id: '1', name: 'test.pdf', status: 'uploading', progress: 50 }]
			}
		});
		expect(wrapper.exists()).toBe(true);
	});
});
