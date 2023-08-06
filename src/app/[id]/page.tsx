
'use client';
import { Divider } from 'primereact/divider';
import Search from '@/components/search/test';
import SearchHeader from '@/components/search/header';
import { Flow } from '@/components/flow';

import useSearchRouteListener from '@/hooks/useSearchRouteListener';

export default function SearchPage() {
    useSearchRouteListener();

	return (
		<>
        <SearchHeader/>
        <div className='search-container flex justify-content-between'>

         <Search />
         <Flow mask={true}/>

        </div>
		</>
	);
}
