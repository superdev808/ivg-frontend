import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import path from 'path';

const public_routes = ['/login'];
function isPublicRoute(path: string) {
	return public_routes.some((publicPath) => path.startsWith(publicPath));
}

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });
	const { data } = await supabase.auth.getSession();

	// if (isPublicRoute(pathname)) {
  //   console.log(data.session);
	// 	return res;
	// }
  console.log(pathname)
	if (!data.session && pathname !== '/login/') {
		return NextResponse.redirect(new URL('/login', req.url));
	}
  if (data.session && pathname === '/login/') {
    return NextResponse.redirect(new URL('/workflows', req.url));
  }

	return res;
}
export const config = {
    matcher: ['/workflows/:pathname*' ,'/calculators/:pathname*','/login'],

};
