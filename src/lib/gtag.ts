import { getUserOrganizationName, getUserRole } from "@/helpers/getUserRole";

export const GA_TRACKING_ID: string | undefined = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const pageview = (url: string) => {
	(window as any).gtag('config', GA_TRACKING_ID, {
		page_path: url,
	});
};

export const event = ({ action, category, label }: { action: string; category: string; label: string; }) => {
	const role = getUserRole(), organizationName = getUserOrganizationName();
	if(role === "Admin" || organizationName === "Ivory Guide")
		return;
	(window as any).gtag('event', action, {
		event_category: category,
		event_label: label,
	});
};
