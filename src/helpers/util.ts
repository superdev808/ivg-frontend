export function isUrl(str: string) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(str);
}

export function getInitials(name: string) {
  return name.split(" ").map((word) => word.charAt(0).toUpperCase())[0];
}

export const formatDate = (date?: Date | null | string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date ? new Date(date) : new Date());

export const formatTime = (date?: Date | null | string) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date ? new Date(date) : new Date());