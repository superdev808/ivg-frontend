
import WorkflowsComponent from '@/components/workflow';
export default  function WorkflowSelectionMenuPage({ params }: { params: { flowIds: string[] } }) {

  const { flowIds } = params;
  return <WorkflowsComponent flowIds={flowIds}/>
}