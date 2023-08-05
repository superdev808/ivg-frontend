import Link from 'next/link';

const Sidebar = ({ isOpen, toggle, navLinks }: { isOpen: boolean; toggle: () => void; navLinks: {id:string, link: string; title: string }[] }): JSX.Element => {
	return (
		<>
			<div
				className="sidebar-container fixed w-full overflow-hidden  left-0  z-10 bg-white"
				style={{
					opacity: `${isOpen ? '1' : '0'}`,
					top: ` ${isOpen ? '100px' : '-100%'}`,
				}}>
				<ul className="sidebar-nav text-center p-0">
					{navLinks.map(item => {
						return (
							
								<li key={item.id}>
									<Link href={item.link}>
										<p>{item.title}</p>
									</Link>
								</li>
							
						);
					})}
	
				</ul>
			</div>
		</>
	);
};

export default Sidebar;
