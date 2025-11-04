<script lang="ts">
	export type SortOption = 'newest' | 'oldest';

	interface Props {
		currentSort: SortOption;
		onSortChange: (sort: SortOption) => void;
	}

	let { currentSort, onSortChange }: Props = $props();
</script>

<div class="mb-6 flex justify-end">
	<div class="inline-flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
		<span class="text-sm text-gray-600 px-2">並び順:</span>
		<button
			onclick={() => onSortChange('newest')}
			class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 {currentSort === 'newest' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}"
		>
			新しい順
		</button>
		<button
			onclick={() => onSortChange('oldest')}
			class="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 {currentSort === 'oldest' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}"
		>
			古い順
		</button>
	</div>
</div>
