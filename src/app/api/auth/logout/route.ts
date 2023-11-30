'use server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {

	try {
		const requestUrl = new URL(request.url);
		const cookieStore = cookies();
		const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
		
		const { error } = await supabase.auth.signOut();;
		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json({
			message: 'Logout successful'
		});

	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
