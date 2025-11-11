import { Redis } from '@upstash/redis/cloudflare';
import { env } from '$env/dynamic/private';

const url = env.UPSTASH_REDIS_REST_URL;
const token = env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
	console.error('Redis configuration missing:', {
		hasUrl: !!url,
		hasToken: !!token
	});
}

export const redis = new Redis({
	url: url || '',
	token: token || ''
});
