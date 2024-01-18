
import { NextResponse } from 'next/server';
import axios from 'axios';
export async function POST(request: Request) {
	try {
		// Read the JSON file using fs
		const body = await request.json();
		const token = body.token;
	    const secret = process.env.RECAPTCHA_SECRET_KEY || ''; 

		const googleResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`);
		const { success } = googleResponse.data;
  

		if (success) {
			return NextResponse.json({
				message: 'Captcha verified successfullyogin successful'
			});
		}
		return NextResponse.json({ error: 'Invalid captcha' }, { status: 400 });
	
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
