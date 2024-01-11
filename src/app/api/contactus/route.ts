import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import nodemailer from 'nodemailer';
import { NextApiRequest } from 'next';
import { Client, SendEmailV3_1, LibraryResponse } from 'node-mailjet';
import { last } from 'lodash';

export async function POST(request: NextRequest) {
	try {
		const { firstName, lastName, email, phone, type, message } = await request.json();

		const mailjet = new Client({
			apiKey: process.env.MJ_APIKEY_PUBLIC,
			apiSecret: process.env.MJ_APIKEY_PRIVATE,
		});

		(async () => {
			const data: SendEmailV3_1.Body = {
				Messages: [
					{
						From: {
							Email: process.env.EMAIL_USER || '',
						},
						To: [
							{
								Email: process.env.EMAIL_USER ||'',
							},
						],
						Subject: `[Ivory Guide][Contact Us] New Message from ${firstName} ${lastName}`,
						HTMLPart: `
						<p>We've received a new inquiry. Below are the details submitted by the visitor for your review and action:</p>

						<ul>
							<li><strong>First Name:</strong> ${firstName}</li>
							<li><strong>Last Name:</strong> ${lastName}<</li>
							<li><strong>Email Address:</strong> ${email}<</li>
							<li><strong>Phone Number:</strong> ${phone}<</li>
							<li><strong>User Type:</strong> ${type}<</li>
							<li><strong>Message:</strong>${message}</li>
						</ul>
						
						<p>&nbsp;</p>`,
						TextPart: 'First Name: ${firstName} Last Name: ${lastName} Email Address: ${email} Phone Number: ${phone} User Type: ${type} Message: ${message}',
					},
				],
			};

			const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet.post('send', { version: 'v3.1' }).request(data);

			const { Status } = result.body.Messages[0];
		})();
		return NextResponse.json({
			message: 'Email sent successfully',
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
