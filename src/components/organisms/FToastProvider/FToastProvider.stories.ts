import type { Meta } from '@storybook/vue';
import FToastProvider from './FToastProvider.vue';
import FButton from '../../atoms/FButton/FButton.vue';

export default {
	title: 'Organisms/FToastProvider',
	component: FToastProvider,
	tags: ['autodocs'],
	argTypes: {
		position: {
			control: { type: 'select' },
			options: [
				'top-left',
				'top-center',
				'top-right',
				'bottom-left',
				'bottom-center',
				'bottom-right'
			],
			description: 'Position par défaut des toasts'
		},
		maxToasts: {
			control: 'number',
			description: 'Nombre maximum de toasts affichés simultanément'
		}
	}
} as Meta<typeof FToastProvider>;

export const Default = () => ({
	components: { FToastProvider, FButton },
	template: `
<FToastProvider ref="provider">
<div class="p-8 space-y-4">
<h2 class="text-2xl font-bold mb-4">Système de Notifications Toast</h2>
<p class="mb-4">Cliquez sur les boutons ci-dessous pour afficher différents types de notifications.</p>

<div class="flex flex-wrap gap-3">
<FButton variant="success" @click="showSuccess">
Toast Succès
</FButton>
<FButton variant="danger" @click="showError">
Toast Erreur
</FButton>
<FButton variant="primary" @click="showInfo">
Toast Info
</FButton>
<FButton variant="warning" @click="showWarning">
Toast Avertissement
</FButton>
<FButton variant="outline" @click="showCustom">
Toast Personnalisé
</FButton>
<FButton variant="ghost" @click="clearAll">
Tout Effacer
</FButton>
</div>
</div>
</FToastProvider>
`,
	methods: {
		showSuccess() {
			(this.$refs.provider as { success: (msg: string) => void }).success(
				'Votre action a été effectuée avec succès.'
			);
		},
		showError() {
			(this.$refs.provider as { error: (msg: string) => void }).error(
				"Une erreur s'est produite. Veuillez réessayer."
			);
		},
		showInfo() {
			(this.$refs.provider as { info: (msg: string) => void }).info(
				'Voici une information importante à prendre en compte.'
			);
		},
		showWarning() {
			(this.$refs.provider as { warning: (msg: string) => void }).warning(
				'Veuillez vérifier vos informations avant de continuer.'
			);
		},
		showCustom() {
			(
				this.$refs.provider as { show: (opts: Record<string, unknown>) => void }
			).show({
				variant: 'info',
				title: 'Notification Personnalisée',
				message: 'Ce toast a une durée personnalisée de 10 secondes.',
				duration: 10000,
				closable: true
			});
		},
		clearAll() {
			(this.$refs.provider as { clear: () => void }).clear();
		}
	}
});

export const DifferentPositions = () => ({
	components: { FToastProvider, FButton },
	template: `
<FToastProvider ref="provider">
<div class="p-8 space-y-4">
<h2 class="text-2xl font-bold mb-4">Positions des Toasts</h2>
<p class="mb-4">Cliquez sur les boutons pour afficher des toasts à différentes positions.</p>

<div class="grid grid-cols-3 gap-3">
<FButton variant="primary" @click="showTopLeft">
Haut Gauche
</FButton>
<FButton variant="primary" @click="showTopCenter">
Haut Centre
</FButton>
<FButton variant="primary" @click="showTopRight">
Haut Droite
</FButton>
<FButton variant="primary" @click="showBottomLeft">
Bas Gauche
</FButton>
<FButton variant="primary" @click="showBottomCenter">
Bas Centre
</FButton>
<FButton variant="primary" @click="showBottomRight">
Bas Droite
</FButton>
</div>
</div>
</FToastProvider>
`,
	methods: {
		showTopLeft() {
			(
				this.$refs.provider as { show: (opts: Record<string, unknown>) => void }
			).show({
				variant: 'info',
				message: 'Toast en haut à gauche',
				position: 'top-left'
			});
		},
		showTopCenter() {
			(
				this.$refs.provider as { show: (opts: Record<string, unknown>) => void }
			).show({
				variant: 'info',
				message: 'Toast en haut au centre',
				position: 'top-center'
			});
		},
		showTopRight() {
			(
				this.$refs.provider as { show: (opts: Record<string, unknown>) => void }
			).show({
				variant: 'info',
				message: 'Toast en haut à droite',
				position: 'top-right'
			});
		},
		showBottomLeft() {
			(
				this.$refs.provider as { show: (opts: Record<string, unknown>) => void }
			).show({
				variant: 'success',
				message: 'Toast en bas à gauche',
				position: 'bottom-left'
			});
		},
		showBottomCenter() {
			(
				this.$refs.provider as { show: (opts: Record<string, unknown>) => void }
			).show({
				variant: 'success',
				message: 'Toast en bas au centre',
				position: 'bottom-center'
			});
		},
		showBottomRight() {
			(
				this.$refs.provider as { show: (opts: Record<string, unknown>) => void }
			).show({
				variant: 'success',
				message: 'Toast en bas à droite',
				position: 'bottom-right'
			});
		}
	}
});

export const GlobalAPI = () => ({
	components: { FToastProvider, FButton },
	template: `
<FToastProvider>
<div class="p-8 space-y-4">
<h2 class="text-2xl font-bold mb-4">API Globale via $root.$toast</h2>
<p class="mb-4">Une fois le FToastProvider monté, vous pouvez accéder aux toasts via <code>this.$root.$toast</code>.</p>

<div class="flex flex-wrap gap-3">
<FButton variant="success" @click="$root.$toast.success('Opération réussie!')">
$root.$toast.success()
</FButton>
<FButton variant="danger" @click="$root.$toast.error('Erreur détectée!')">
$root.$toast.error()
</FButton>
<FButton variant="primary" @click="$root.$toast.info('Nouvelle information')">
$root.$toast.info()
</FButton>
<FButton variant="warning" @click="$root.$toast.warning('Attention requise')">
$root.$toast.warning()
</FButton>
</div>

<div class="mt-6 p-4 bg-neutral-100 rounded">
<h3 class="font-bold mb-2">Exemple d'utilisation dans vos composants:</h3>
<pre class="text-sm"><code>// Dans n'importe quel composant
this.$root.$toast.success('Message de succès');
this.$root.$toast.error("Message d'erreur");
this.$root.$toast.info("Message d'information");
this.$root.$toast.warning("Message d'avertissement");</code></pre>
</div>
</div>
</FToastProvider>
`
});

export const MaxToastsLimit = () => ({
	components: { FToastProvider, FButton },
	data() {
		return {
			counter: 0
		};
	},
	template: `
<FToastProvider ref="provider" :max-toasts="3">
<div class="p-8 space-y-4">
<h2 class="text-2xl font-bold mb-4">Limite de Toasts (max: 3)</h2>
<p class="mb-4">Le provider est configuré pour afficher un maximum de 3 toasts. Les anciens seront automatiquement supprimés.</p>

<FButton variant="primary" @click="addToast">
Ajouter un Toast ({{ counter }})
</FButton>
</div>
</FToastProvider>
`,
	methods: {
		addToast() {
			this.counter++;
			(
				this.$refs.provider as { show: (opts: Record<string, unknown>) => void }
			).show({
				variant: 'info',
				title: `Toast #${this.counter}`,
				message: `Ceci est le toast numéro ${this.counter}`,
				duration: 0
			});
		}
	}
});

export const PersistentToasts = () => ({
	components: { FToastProvider, FButton },
	template: `
<FToastProvider ref="provider">
<div class="p-8 space-y-4">
<h2 class="text-2xl font-bold mb-4">Toasts Persistants</h2>
<p class="mb-4">Ces toasts ne se ferment pas automatiquement (duration: 0).</p>

<div class="flex flex-wrap gap-3">
<FButton variant="primary" @click="showPersistent">
Toast Persistant
</FButton>
<FButton variant="outline" @click="showNonClosable">
Toast Non Fermable
</FButton>
<FButton variant="ghost" @click="$refs.provider.clear()">
Tout Effacer
</FButton>
</div>
</div>
</FToastProvider>
`,
	methods: {
		showPersistent() {
			(
				this.$refs.provider as { show: (opts: Record<string, unknown>) => void }
			).show({
				variant: 'info',
				title: 'Toast Persistant',
				message:
					'Ce toast ne se fermera pas automatiquement, mais vous pouvez le fermer manuellement.',
				duration: 0
			});
		},
		showNonClosable() {
			(
				this.$refs.provider as { show: (opts: Record<string, unknown>) => void }
			).show({
				variant: 'warning',
				title: 'Toast Non Fermable',
				message:
					'Ce toast ne peut être fermé ni automatiquement ni manuellement.',
				duration: 0,
				closable: false
			});
		}
	}
});
