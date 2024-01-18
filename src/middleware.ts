import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './helpers/verifyAuth';
import cookie from 'cookie';


export async function middleware(req: NextRequest) {
	// const cookies = cookie.parse(req.headers.get('cookie') || '');
	// const token = cookies['appToken'];
	// const isAuth = await verifyAuth(token);
	// const pathname = req.nextUrl.pathname;
	
	// console.log(pathname, isAuth);
	// if(isAuth) {
	// 	if ( pathname === '/login/') {
	// 		return NextResponse.redirect(new URL('/calculators/', req.url));
	// 	}
	
	// 	if (pathname == '/') {
	// 		return NextResponse.redirect(new URL('/calculators/', req.url));
	// 	}

	// }


	return NextResponse.next();
}
export const config = {
	matcher: ['/:pathname*','/'],
};
