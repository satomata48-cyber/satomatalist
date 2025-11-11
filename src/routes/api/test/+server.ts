import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return json({
		hasUrl: !!env.UPSTASH_REDIS_REST_URL,
		hasToken: !!env.UPSTASH_REDIS_REST_TOKEN,
		urlLength: env.UPSTASH_REDIS_REST_URL?.length || 0,
		tokenLength: env.UPSTASH_REDIS_REST_TOKEN?.length || 0
	});
};
