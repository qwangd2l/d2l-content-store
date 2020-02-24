import { css, html, LitElement } from 'lit-element/lit-element.js';
import { bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import ContentServiceClient from './util/content-service-client.js';
import { DependencyProvider } from './mixins/dependency-provider-mixin.js';
import { rootStore } from './state/root-store.js';
import { Uploader } from './state/uploader.js';

class D2lContentStore extends DependencyProvider(LitElement) {
	static get properties() {
		return {
			apiEndpoint: { type: String, attribute: 'api-endpoint' },
			tenantId: { type: String, attribute: 'tenant-id' }
		};
	}

	static get styles() {
		return [bodyStandardStyles, css`
			:host {
				display: inline-block;
				height: 100%;
				overflow: auto;
				width: 100%;
			}
			:host([hidden]) {
				display: none;
			}
		`];
	}

	constructor() {
		super();

		// eslint-disable-next-line no-unused-expressions
		import('./d2l-content-store-app.js');
	}

	firstUpdated() {
		super.firstUpdated();

		const apiClient = new ContentServiceClient({
			endpoint: this.apiEndpoint,
			tenantId: this.tenantId
		});
		this.provideDependency('content-service-client', apiClient);
		rootStore.uploader.apiClient = apiClient;

		const uploader = new Uploader({
			apiClient
		});

		this.provideDependency('uploader', uploader);
	}

	render() {
		return html`<d2l-content-store-app class="d2l-body-standard"></d2l-content-store-app>`;
	}
}

customElements.define('d2l-content-store', D2lContentStore);
