import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './helpers/verifyAuth';
import cookie from 'cookie';


export async function middleware(req: NextRequest) {
	const cookies = cookie.parse(req.headers.get('cookie') || '');
	const token = cookies['appToken'];
	const isAuth = await verifyAuth(token);

	const pathname = req.nextUrl.pathname;
	if (isAuth && pathname === '/login/') {
		return NextResponse.redirect(new URL('/calculators', req.url));
	}
	if (isAuth && pathname === '/') {
		return NextResponse.redirect(new URL('/calculators', req.url));
	}


	
	// const supabase = createMiddlewareClient({ req, res });
	// const { data } = await supabase.auth.getSession();

	// if (data.session && pathname === '/login/') {
	// 	return NextResponse.redirect(new URL('/calculators', req.url));
	// }
	// if (data.session && pathname === '/') {
	// 	return NextResponse.redirect(new URL('/calculators', req.url));
	// }

	const res = NextResponse.next();
	return res;
}
export const config = {
	matcher: ['/:pathname*'],
};
