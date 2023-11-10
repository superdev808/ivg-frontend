
import WorkflowsComponent from '@/components/workflow';
import { LoginComponent } from '@/components/login';
import { redirect } from 'next/navigation';
import createClient from '@/lib/supabase-server';
export default async function WorkflowSelectionMenuPage({ params }: { params: { flowIds: string[] } }) {
	const supabase = createClient();

	const { data } = await supabase.auth.getSession();


	if (!data) {
		redirect('/login');
	}
  const { flowIds } = params;
  return <WorkflowsComponent flowIds={flowIds}/>
}