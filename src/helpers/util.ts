export function isUrl(str: string) {
	const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
	return urlRegex.test(str);
}

export function getInitials(name: string) {
	return name
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase())[0]
		;
}
