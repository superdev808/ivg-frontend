import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import nodemailer from 'nodemailer';
import { NextApiRequest } from 'next';

export async function POST(request: NextRequest) {
	try {
		const { firstName,lastName , email, phone} = await request.json();
    ;
    console.log(request.body)
		let transporter = nodemailer.createTransport({
			service: 'gmail', 
			auth: {
				user: process.env.EMAIL_USER, 
				pass: process.env.EMAIL_PASS, 
			},
		});

		// Email options
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER, 
			subject: `Ivory Guide New Message from ${firstName}`,
			text: `You have received a new message from ${firstName} ${lastName} (${email}) (${phone})`,
		};
		// Send the email
		await transporter.sendMail(mailOptions);

		return NextResponse.json({
			message: 'Email sent successfully',
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
