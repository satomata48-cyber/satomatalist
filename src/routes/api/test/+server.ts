import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { Redis } from '@upstash/redis/cloudflare';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const redis = new Redis({
			url: env.UPSTASH_REDIS_REST_URL || '',
			token: env.UPSTASH_REDIS_REST_TOKEN || ''
		});

		// Try to get data
		const data = await redis.get('satomatalist:links');

		return json({
			hasUrl: !!env.UPSTASH_REDIS_REST_URL,
			hasToken: !!env.UPSTASH_REDIS_REST_TOKEN,
			urlLength: env.UPSTASH_REDIS_REST_URL?.length || 0,
			tokenLength: env.UPSTASH_REDIS_REST_TOKEN?.length || 0,
			redisConnected: true,
			dataType: typeof data,
			isArray: Array.isArray(data),
			data: data
		});
	} catch (error) {
		return json({
			hasUrl: !!env.UPSTASH_REDIS_REST_URL,
			hasToken: !!env.UPSTASH_REDIS_REST_TOKEN,
			error: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined
		}, { status: 500 });
	}
};
