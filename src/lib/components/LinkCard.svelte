<script lang="ts">
	interface Props {
		id: number;
		title: string;
		description: string;
		url: string;
		imageUrl?: string;
		onDelete: (id: number) => void;
	}

	let { id, title, description, url, imageUrl, onDelete }: Props = $props();
</script>

<div class="relative group/card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
	<!-- 削除ボタン -->
	<button
		onclick={(e) => {
			e.stopPropagation();
			if (confirm(`「${title}」を削除しますか？`)) {
				onDelete(id);
			}
		}}
		class="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 shadow-lg"
		title="削除"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
		</svg>
	</button>

	<a
		href={url}
		target="_blank"
		rel="noopener noreferrer"
		class="block"
	>
		{#if imageUrl}
			<div class="aspect-video w-full overflow-hidden bg-blue-500">
				<img
					src={imageUrl}
					alt={title}
					class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
					onerror={(e) => {
						const target = e.currentTarget as HTMLImageElement;
						target.style.display = 'none';
					}}
				/>
			</div>
		{/if}
		<div class="p-6">
			<h3 class="text-xl font-bold text-gray-900 mb-2 group-hover/card:text-blue-600 transition-colors">
				{title}
			</h3>
			<p class="text-gray-600 text-sm line-clamp-3">
				{description}
			</p>
		</div>
	</a>
</div>
