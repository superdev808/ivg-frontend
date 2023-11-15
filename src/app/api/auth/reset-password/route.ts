import createClient from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const supabase = createClient();

		const { data, error } = await supabase.auth.updateUser({
			password: body.password,
		});
		if (error) {
			throw error;
		}
		if (data) {
			return NextResponse.json({
				message:'Password has been updated successfully!'
			});
		} 
	} catch (error: any) {
		return NextResponse.json({ error: `Error updating password: ${error.message}` }, { status: 500 });
	}
}

