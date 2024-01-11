import { jwtVerify } from 'jose';

export async function verifyAuth(token: string) {
	if (!token) {
		console.log('Token is missing');
		return false;
	}

	try {
		const secretKey = process.env.NEXT_PUBLIC_TOKEN_SECRET;
		if (!secretKey) {
			console.log('JWT secret key is missing');
			return false;
		}

		await jwtVerify(token, new TextEncoder().encode(secretKey));
		return true;
	} catch (error) {
		console.error('JWT verification failed:', error);
		return false;
	}
}
