<script lang="ts">
	import LinkCard from '$lib/components/LinkCard.svelte';
	import AddLinkForm from '$lib/components/AddLinkForm.svelte';
	import SortFilter, { type SortOption } from '$lib/components/SortFilter.svelte';
	import { linksStore } from '$lib/stores/linksStore';

	let sortOption = $state<SortOption>('newest');

	// ソートされたリンク
	const sortedLinks = $derived(() => {
		const allLinks = $linksStore;
		if (sortOption === 'newest') {
			return [...allLinks].sort((a, b) => b.createdAt - a.createdAt);
		} else if (sortOption === 'oldest') {
			return [...allLinks].sort((a, b) => a.createdAt - b.createdAt);
		}
		// manual の場合はそのままの順序
		return allLinks;
	});

	const links = $derived(sortedLinks());

	function handleSortChange(sort: SortOption) {
		sortOption = sort;
	}
</script>

<svelte:head>
	<title>さとまたシステムリスト</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-5xl font-bold text-gray-900 mb-4">さとまたシステムリスト</h1>
			<p class="text-lg text-gray-600">よく使うWebサイトを管理しよう</p>
		</div>

		<AddLinkForm />

		{#if links.length === 0}
			<div class="text-center py-12">
				<p class="text-xl text-gray-500">まだリンクがありません。上のボタンから追加してください。</p>
			</div>
		{:else}
			<SortFilter currentSort={sortOption} onSortChange={handleSortChange} />

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each links as link (link.id)}
					<LinkCard
						id={link.id}
						title={link.title}
						description={link.description}
						url={link.url}
						imageUrl={link.imageUrl}
						onDelete={linksStore.deleteLink}
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>
