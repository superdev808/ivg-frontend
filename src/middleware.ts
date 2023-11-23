import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });
	const { data } = await supabase.auth.getSession();

	if (data.session && pathname === '/login/') {
		return NextResponse.redirect(new URL('/search', req.url));
	}
	if (data.session && pathname === '/') {
		return NextResponse.redirect(new URL('/search', req.url));
	}

	return res;
}
export const config = {
	matcher: ['/:pathname*'],
};
