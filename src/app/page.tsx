'use client';
import React from 'react';
import { redirect } from 'next/navigation'



export default function Index() {

	React.useEffect(() => {
		redirect('/calculators')
	}, []);
	return (<>
		</>
	
	);
}
