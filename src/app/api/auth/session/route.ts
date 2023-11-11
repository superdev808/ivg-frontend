import createClient from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		const supabase = createClient();
		const { data } = await supabase.auth.getSession();
		if (data?.session) {
			return NextResponse.json({
				data: data?.session,
			});
		} else {
			return NextResponse.json({
				data: null,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
