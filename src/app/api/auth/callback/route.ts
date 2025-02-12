import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	const cookieStore = cookies()

	if (code) {
		const supabase = createRouteHandlerClient({cookies: () => cookieStore});
		await supabase.auth.exchangeCodeForSession(code);
	}
	return requestUrl.searchParams
	// URL to redirect to after sign in process completes
	// return NextResponse.redirect(requestUrl.origin);
}
