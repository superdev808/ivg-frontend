'use client';
import { InputText } from 'primereact/inputtext';
import SearchBar from '@/components/searchBar';
import { Divider } from 'primereact/divider';
import { useRouter } from 'next/navigation';
import { useGetFlowsQuery } from '@/redux/services/flowApi';

export default function Index() {
	return (<>
		</>
		// <div className={'search-wrapper flex  justify-content-center  '}>
		// 	<div className=" w-full md:w-5 ">
		// 		<div className="search-title flex justify-content-center ">
		// 			<h1 className="text-dark text-color-secondary m-0">How can we help you?</h1>
		// 		</div>
		// 		<div className="flex  justify-content-center">
		// 			<div className=" w-6 m-0 ">
		// 				<Divider></Divider>
		// 			</div>
		// 		</div>
		// 		<SearchBar />
		// 	</div>
		// </div>
	);
}
