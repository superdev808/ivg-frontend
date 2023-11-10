import { LoginComponent } from '@/components/login';
import { redirect } from 'next/navigation';
import createClient from '@/lib/supabase-server';
export default async function LoginPage() {
	const supabase = createClient();

	const { data } = await supabase.auth.getSession();


	if (data) {
		redirect('/workflows');
	}

	return <LoginComponent />;
}
