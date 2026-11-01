export function toDateTimeLocalInput(deadline: string | null | undefined) {
  if (!deadline) {
    return "";
  }

  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 16);
}

export function fromDateTimeLocalInput(deadline: string) {
  return deadline ? new Date(deadline).toISOString() : null;
}

export function formatTaskDeadline(deadline: string | null | undefined) {
  if (!deadline) {
    return "";
  }

  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) {
    return deadline;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
