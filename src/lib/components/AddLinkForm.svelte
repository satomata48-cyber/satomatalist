<script lang="ts">
	import { linksStore } from '$lib/stores/linksStore';

	let isOpen = $state(false);
	let title = $state('');
	let description = $state('');
	let url = $state('');

	const materialBlueColors = [
		'2196F3', '1976D2', '1565C0', '0D47A1', // Blue
		'03A9F4', '0288D1', '0277BD', '01579B', // Light Blue
		'00BCD4', '0097A7', '00838F', '006064'  // Cyan
	];

	function getRandomBlueColor() {
		return materialBlueColors[Math.floor(Math.random() * materialBlueColors.length)];
	}

	function handleSubmit() {
		if (title && url) {
			linksStore.addLink({
				title,
				description: description || 'リンクの説明',
				url,
				imageUrl: `https://placehold.co/400x225/${getRandomBlueColor()}/ffffff?text=${encodeURIComponent(title.slice(0, 10))}`
			});

			// フォームをリセット
			title = '';
			description = '';
			url = '';
			isOpen = false;
		}
	}
</script>

<div class="mb-8">
	{#if !isOpen}
		<button
			onclick={() => isOpen = true}
			class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
		>
			+ 新しいリンクを追加
		</button>
	{:else}
		<div class="bg-white rounded-lg shadow-lg p-6">
			<h3 class="text-xl font-bold mb-4 text-gray-900">新しいリンクを追加</h3>
			<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
				<div>
					<label for="title" class="block text-sm font-medium text-gray-700 mb-1">
						タイトル <span class="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="title"
						bind:value={title}
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="例: Googleドキュメント"
					/>
				</div>

				<div>
					<label for="url" class="block text-sm font-medium text-gray-700 mb-1">
						URL <span class="text-red-500">*</span>
					</label>
					<input
						type="url"
						id="url"
						bind:value={url}
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="https://example.com"
					/>
				</div>

				<div>
					<label for="description" class="block text-sm font-medium text-gray-700 mb-1">
						説明
					</label>
					<textarea
						id="description"
						bind:value={description}
						rows="3"
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="リンクの説明を入力してください"
					></textarea>
				</div>

				<div class="flex gap-3 pt-2">
					<button
						type="submit"
						class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
					>
						リンク登録
					</button>
					<button
						type="button"
						onclick={() => isOpen = false}
						class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors duration-200"
					>
						キャンセル
					</button>
				</div>
			</form>
		</div>
	{/if}
</div>
