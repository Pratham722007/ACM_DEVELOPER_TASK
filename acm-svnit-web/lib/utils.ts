/**
 * Generates a consistent HSL color from a string (e.g., a name).
 */
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash % 360);
  return `hsl(${h}, 60%, 45%)`;
}

/**
 * Gets initials from a full name (max 2 characters).
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Formats an ISO date string into a readable format.
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Determines the status of an event based on its date.
 */
export function getEventStatus(
  dateStr: string
): "live" | "upcoming" | "past" {
  const eventDate = new Date(dateStr);
  const today = new Date();
  const diffMs = eventDate.getTime() - today.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (Math.abs(diffDays) <= 1) return "live";
  if (diffDays > 1) return "upcoming";
  return "past";
}

/**
 * cn - classname merger utility
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
