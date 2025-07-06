interface BreadcrumbProps {
	links: {
		label: string;
		href: string;
	}[];
}

export default function Breadcrumb({ links }: BreadcrumbProps) {
	return (
		<nav aria-label="breadcrumb">
			<ol className="inline-flex items-center space-x-4 py-2 text-sm font-medium">
				<li className="inline-flex items-center">
					<a href="#" className="text-secondary-500 hover:text-secondary-600">
						Home
					</a>
				</li>
				{links.map((link) => (
					<li className="inline-flex items-center space-x-4" key={link.label}>
						<svg
							className="h-6 w-6 text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<title>Arrow Right</title>
							<path
								fill-rule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clip-rule="evenodd"></path>
						</svg>
						<a
							href={link.href}
							className="text-secondary-500 hover:text-secondary-600">
							{link.label}
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
}
