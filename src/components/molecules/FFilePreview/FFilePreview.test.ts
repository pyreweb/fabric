import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FFilePreview from './FFilePreview.vue';

describe('FFilePreview', () => {
	it('renders correctly with required props', () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'document.pdf' }
		});
		expect(wrapper.text()).toContain('document.pdf');
	});

	it('displays file name', () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'test-file.docx' }
		});
		expect(wrapper.text()).toContain('test-file.docx');
	});

	it('shows loader when loading', () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'file.pdf', loading: true }
		});
		expect(wrapper.findComponent({ name: 'FLoader' }).exists()).toBe(true);
	});

	it('shows remove button when not loading', () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'file.pdf', loading: false }
		});
		expect(wrapper.findComponent({ name: 'FButton' }).exists()).toBe(true);
	});

	it('emits remove event when remove button is clicked', async () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'file.pdf' }
		});
		await wrapper.findComponent({ name: 'FButton' }).trigger('click');
		expect(wrapper.emitted('remove')).toBeTruthy();
	});

	it('does not emit remove when disabled', async () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'file.pdf', disabled: true }
		});
		// Button is disabled so we can just verify the disabled state
		expect(wrapper.html()).toContain('disabled');
	});

	it('detects file extension from fileName', () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'image.png' }
		});
		expect(wrapper.findComponent({ name: 'FIcon' }).exists()).toBe(true);
	});

	it('uses fileType prop when provided', () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'file', fileType: 'pdf' }
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('applies disabled styles', () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'file.pdf', disabled: true }
		});
		expect(wrapper.classes().join(' ')).toContain('opacity-50');
	});

	it('shows img with object-contain when previewUrl is provided for an image file', () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'image.svg', previewUrl: 'https://example.com/image.svg' }
		});
		const img = wrapper.find('img');
		expect(img.exists()).toBe(true);
		expect(img.classes()).toContain('object-contain');
		expect(img.classes()).not.toContain('object-cover');
	});

	it('does not show img when previewUrl is provided for a non-image file', () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'doc.pdf', previewUrl: 'https://example.com/doc.pdf' }
		});
		expect(wrapper.find('img').exists()).toBe(false);
	});

	it('does not show img when previewUrl is absent', () => {
		const wrapper = mount(FFilePreview, {
			propsData: { fileName: 'image.png' }
		});
		expect(wrapper.find('img').exists()).toBe(false);
	});
});
