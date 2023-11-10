'use client';

import { LoginComponent } from '@/components/login';
import { redirect } from 'next/navigation';
import createClient from '@/lib/supabase-server';
import { supabase } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation'
import { use } from 'react';

export default  function SignOutPage() {
	const router = useRouter()



	const handleSignOut = async () => {
		await supabase.auth.signOut()
		redirect('http://localhost:300/login');
	  }
	  handleSignOut()
	return <></>;
}
