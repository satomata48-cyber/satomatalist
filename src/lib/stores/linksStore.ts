import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Link {
	id: number;
	title: string;
	description: string;
	url: string;
	imageUrl?: string;
	createdAt: number; // タイムスタンプ
}

const materialBlueColors = [
	'2196F3', '1976D2', '1565C0', '0D47A1', // Blue
	'03A9F4', '0288D1', '0277BD', '01579B', // Light Blue
	'00BCD4', '0097A7', '00838F', '006064'  // Cyan
];

function getRandomBlueColor() {
	return materialBlueColors[Math.floor(Math.random() * materialBlueColors.length)];
}

const defaultLinks: Link[] = [
	{
		id: 1,
		title: 'Svelte公式サイト',
		description: 'Svelteは、リアクティブなWebアプリケーションを構築するための革新的なフレームワークです。',
		url: 'https://svelte.dev',
		createdAt: Date.now() - 5000
	},
	{
		id: 2,
		title: 'SvelteKit',
		description: 'SvelteKitは、Svelteを使用したフルスタックWebアプリケーションフレームワークです。',
		url: 'https://kit.svelte.dev',
		createdAt: Date.now() - 4000
	},
	{
		id: 3,
		title: 'Tailwind CSS',
		description: 'ユーティリティファーストのCSSフレームワークで、素早くモダンなデザインを実現できます。',
		url: 'https://tailwindcss.com',
		createdAt: Date.now() - 3000
	},
	{
		id: 4,
		title: 'TypeScript',
		description: 'JavaScriptに型安全性を追加した、マイクロソフトが開発したプログラミング言語です。',
		url: 'https://www.typescriptlang.org',
		createdAt: Date.now() - 2000
	},
	{
		id: 5,
		title: 'Vite',
		description: '次世代のフロントエンドツール。超高速な開発サーバーとビルドツールを提供します。',
		url: 'https://vitejs.dev',
		createdAt: Date.now() - 1000
	},
	{
		id: 6,
		title: 'MDN Web Docs',
		description: 'Web技術に関する包括的なドキュメントとリファレンスを提供する開発者向けリソース。',
		url: 'https://developer.mozilla.org',
		createdAt: Date.now()
	}
].map(link => ({
	...link,
	imageUrl: `https://placehold.co/400x225/${getRandomBlueColor()}/ffffff?text=${encodeURIComponent(link.title.slice(0, 10))}`
}));

// APIからデータを読み込む
async function loadLinksFromAPI(): Promise<Link[]> {
	if (browser) {
		try {
			const response = await fetch('/api/links');
			const links = await response.json();

			// APIにデータがない場合、localStorageから移行
			if (links.length === 0) {
				const stored = localStorage.getItem('satomatalist-links');
				if (stored) {
					const localLinks = JSON.parse(stored);
					// localStorageのデータをUpstashに保存
					await saveLinksToAPI(localLinks);
					localStorage.removeItem('satomatalist-links'); // 移行後は削除
					return localLinks;
				}
				return defaultLinks;
			}
			return links;
		} catch (error) {
			console.error('Failed to load links from API:', error);
			// APIが失敗した場合はlocalStorageから読み込む
			const stored = localStorage.getItem('satomatalist-links');
			if (stored) {
				return JSON.parse(stored);
			}
			return defaultLinks;
		}
	}
	return defaultLinks;
}

// APIにデータを保存
async function saveLinksToAPI(links: Link[]) {
	if (browser) {
		try {
			await fetch('/api/links', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(links)
			});
		} catch (error) {
			console.error('Failed to save links to API:', error);
		}
	}
}

function createLinksStore() {
	const { subscribe, set, update } = writable<Link[]>(defaultLinks);

	// 初期化時にAPIからデータを読み込む
	if (browser) {
		loadLinksFromAPI().then(set);
	}

	return {
		subscribe,
		addLink: async (link: Omit<Link, 'id' | 'createdAt'>) => {
			update((links) => {
				const newId = links.length > 0 ? Math.max(...links.map((l) => l.id)) + 1 : 1;
				const newLinks = [...links, { ...link, id: newId, createdAt: Date.now() }];
				saveLinksToAPI(newLinks);
				return newLinks;
			});
		},
		deleteLink: async (id: number) => {
			update((links) => {
				const newLinks = links.filter((link) => link.id !== id);
				saveLinksToAPI(newLinks);
				return newLinks;
			});
		},
		reorderLinks: async (newOrder: Link[]) => {
			set(newOrder);
			saveLinksToAPI(newOrder);
		},
		reset: async () => {
			set(defaultLinks);
			saveLinksToAPI(defaultLinks);
		}
	};
}

export const linksStore = createLinksStore();
