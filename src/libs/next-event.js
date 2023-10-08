export function getNextEvent(events) {
  const currentDate = new Date();

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > currentDate
  );

  const nextEvent =
    upcomingEvents.length > 0
      ? upcomingEvents.reduce((a, b) =>
          new Date(a.date) < new Date(b.date) ? a : b
        )
      : null;

  return nextEvent;
}
