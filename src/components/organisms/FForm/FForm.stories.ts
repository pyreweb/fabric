import type { Meta } from '@storybook/vue';
import FForm from './FForm.vue';
import FFormField from '../../molecules/FFormField/FFormField.vue';
import FButton from '../../atoms/FButton/FButton.vue';
import FCheckbox from '../../atoms/FCheckbox/FCheckbox.vue';

export default {
	title: 'Organisms/FForm',
	component: FForm,
	tags: ['autodocs'],
	argTypes: {}
} as Meta<typeof FForm>;

export const Default = () => ({
	components: { FForm, FFormField, FButton },
	data() {
		return {
			form: {
				name: '',
				email: ''
			}
		};
	},
	methods: {
		handleSubmit() {
			alert(
				`Formulaire soumis:\nNom: ${this.form.name}\nEmail: ${this.form.email}`
			);
		}
	},
	template: `
<FForm @submit="handleSubmit">
<FFormField
v-model="form.name"
label="Nom"
placeholder="Votre nom"
required
/>
<FFormField
v-model="form.email"
label="Email"
type="email"
placeholder="exemple@email.com"
required
/>
<template #actions>
<FButton type="submit" variant="primary">Envoyer</FButton>
</template>
</FForm>
`
});

export const LoginForm = () => ({
	components: { FForm, FFormField, FButton, FCheckbox },
	data() {
		return {
			form: {
				email: '',
				password: '',
				remember: false
			}
		};
	},
	methods: {
		handleSubmit() {
			alert('Connexion en cours...');
		}
	},
	template: `
<FForm @submit="handleSubmit" class="max-w-sm">
<FFormField
v-model="form.email"
label="Email"
type="email"
placeholder="exemple@email.com"
required
/>
<FFormField
v-model="form.password"
label="Mot de passe"
type="password"
required
/>
<FCheckbox v-model="form.remember" label="Se souvenir de moi" />
<template #actions>
<FButton type="submit" variant="primary" block>Se connecter</FButton>
</template>
</FForm>
`
});

export const RegistrationForm = () => ({
	components: { FForm, FFormField, FButton, FCheckbox },
	data() {
		return {
			form: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
				terms: false
			}
		};
	},
	methods: {
		handleSubmit() {
			if (this.form.password !== this.form.confirmPassword) {
				alert('Les mots de passe ne correspondent pas');
				return;
			}
			alert('Inscription réussie !');
		}
	},
	template: `
<FForm @submit="handleSubmit" class="max-w-md">
<div class="grid grid-cols-2 gap-4">
<FFormField
v-model="form.firstName"
label="Prénom"
required
/>
<FFormField
v-model="form.lastName"
label="Nom"
required
/>
</div>
<FFormField
v-model="form.email"
label="Email"
type="email"
required
/>
<FFormField
v-model="form.password"
label="Mot de passe"
type="password"
hint="8 caractères minimum"
required
/>
<FFormField
v-model="form.confirmPassword"
label="Confirmer le mot de passe"
type="password"
required
/>
<FCheckbox
v-model="form.terms"
label="J'accepte les conditions d'utilisation"
/>
<template #actions>
<FButton type="submit" variant="primary" block>S'inscrire</FButton>
</template>
</FForm>
`
});

export const ContactForm = () => ({
	components: { FForm, FFormField, FButton },
	data() {
		return {
			form: {
				name: '',
				email: '',
				subject: '',
				message: ''
			},
			isLoading: false
		};
	},
	methods: {
		async handleSubmit() {
			this.isLoading = true;
			await new Promise((resolve) => setTimeout(resolve, 1500));
			this.isLoading = false;
			alert('Message envoyé !');
			this.form = { name: '', email: '', subject: '', message: '' };
		}
	},
	template: `
<FForm @submit="handleSubmit" class="max-w-lg">
<FFormField
v-model="form.name"
label="Nom complet"
required
/>
<FFormField
v-model="form.email"
label="Email"
type="email"
required
/>
<FFormField
v-model="form.subject"
label="Sujet"
required
/>
<div class="flex flex-col gap-1.5">
<label class="text-sm font-medium text-neutral-700">Message</label>
<textarea
v-model="form.message"
rows="5"
class="block w-full font-sans border rounded py-2.5 px-3.5 text-sm border-neutral-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
placeholder="Votre message..."
></textarea>
</div>
<template #actions>
<FButton type="button" variant="outline">Annuler</FButton>
<FButton type="submit" variant="primary" :loading="isLoading">Envoyer</FButton>
</template>
</FForm>
`
});

export const WithValidation = () => ({
	components: { FForm, FFormField, FButton },
	data() {
		return {
			form: {
				email: '',
				password: ''
			},
			errors: {} as Record<string, string>
		};
	},
	methods: {
		validate() {
			this.errors = {};
			if (!this.form.email) {
				this.errors.email = "L'email est requis";
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
				this.errors.email = 'Email invalide';
			}
			if (!this.form.password) {
				this.errors.password = 'Le mot de passe est requis';
			} else if (this.form.password.length < 8) {
				this.errors.password =
					'Le mot de passe doit faire au moins 8 caractères';
			}
			return Object.keys(this.errors).length === 0;
		},
		handleSubmit() {
			if (this.validate()) {
				alert('Formulaire valide !');
			}
		}
	},
	template: `
<FForm @submit="handleSubmit" class="max-w-sm">
<FFormField
v-model="form.email"
label="Email"
type="email"
:errorMessage="errors.email"
required
/>
<FFormField
v-model="form.password"
label="Mot de passe"
type="password"
:errorMessage="errors.password"
hint="8 caractères minimum"
required
/>
<template #actions>
<FButton type="submit" variant="primary">Valider</FButton>
</template>
</FForm>
`
});
