import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
	try {
		// Read the JSON file using fs
		const body = await request.json();
		const requestUrl = new URL(request.url);
		const email = body.email;
		const password = body.password;
		const cookieStore = cookies();
		const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
		const { data,error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json({
			message: 'Login successful',
			callback_url: requestUrl.origin,
		});

	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
