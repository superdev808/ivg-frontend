import { jwtVerify } from 'jose';

export async function verifyAuth(token: string) {
	if (!token) {
		return false;
	}

	try {
		const secretKey = process.env.NEXT_PUBLIC_TOKEN_SECRET;
		if (!secretKey) {
			return false;
		}

		await jwtVerify(token, new TextEncoder().encode(secretKey));
		return true;
	} catch (error) {
		return false;
	}
}
