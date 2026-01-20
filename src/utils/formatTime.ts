export const formatTime = (dateString: string) => {
  if (!dateString) "";
  const d = new Date(dateString);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};
