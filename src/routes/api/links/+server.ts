import { json } from '@sveltejs/kit';
import { redis } from '$lib/server/redis';
import type { RequestHandler } from './$types';

const LINKS_KEY = 'satomatalist:links';

export interface Link {
	id: number;
	title: string;
	description: string;
	url: string;
	imageUrl?: string;
	createdAt: number;
}

// GET - リンクを取得
export const GET: RequestHandler = async () => {
	try {
		const links = await redis.get<Link[]>(LINKS_KEY);
		const result = Array.isArray(links) ? links : [];
		return json(result);
	} catch (error) {
		console.error('Failed to get links:', error);
		return json([], { status: 500 });
	}
};

// POST - リンクを保存
export const POST: RequestHandler = async ({ request }) => {
	try {
		const links: Link[] = await request.json();
		await redis.set(LINKS_KEY, links);
		return json({ success: true });
	} catch (error) {
		console.error('Failed to save links:', error);
		return json({ success: false, error: 'Failed to save links' }, { status: 500 });
	}
};
