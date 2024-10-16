export default async function epg() {
  const csv = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRrjIHS0EZjh4sXqsDuRz5CtQMUWjn2J_QUQ85-Isht8JhpBap1hF6vPgaNLdJ57rplHMwuG41KUzQ9/pub?output=csv"
  ).then((res) => res.text());

  const events = csv
    .split("\n")
    .slice(1)
    .flatMap((row) => {
      const [inicio, fin, lobby, centro, cueva, ventana, rincon] = row.split(",");

      const since = `2024-10-19T${inicio}`;
      const till = `2024-10-19T${fin}`;

      // Array to hold all events
      const eventList = [];

      // Push individual events only if they exist
      if (lobby && lobby !== "/r") {
        eventList.push({
          since,
          till,
          location: "lobby",
          title: lobby,
          channelUuid: "16fdfefe-e466-4090-bc1a-57c43937f826",
        });
      }

      if (centro && centro !== "/r") {
        eventList.push({
          since,
          till,
          location: "centro",
          title: centro,
          channelUuid: "96aaf72c-b5ed-4ce4-937d-1912e4f8bf0d",
        });
      }

      if (cueva && cueva !== "/r") {
        eventList.push({
          since,
          till,
          location: "cueva",
          title: cueva,
          channelUuid: "16fdfefe-e466-4090-bc1a-57c43937f826",
        });
      }

      if (ventana && ventana !== "/r") {
        eventList.push({
          since,
          till,
          location: "ventana",
          title: ventana,
          channelUuid: "16fdfefe-e466-4090-bc1a-57c43937f826",
        });
      }

      if (rincon && rincon !== "\r") {
        eventList.push({
          since,
          till,
          location: "rincon",
          title: rincon,
          channelUuid: "16fdfefe-e466-4090-bc1a-57c43937f826",
        });
      }

      return eventList;
    });

  console.log({ events });

  return events;
}
