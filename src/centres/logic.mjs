// Made-up example data: all centres, towns and bay counts are fictional.
export const centres = [
  { name: "Cloudberry Test Centre", town: "Brindlewick", bays: 2 },
  { name: "Copperleaf Test Centre", town: "Brindlewick", bays: 3 },
  { name: "Moonfern Test Centre", town: "Puddlehaven", bays: 1 },
  { name: "Pebblewing Test Centre", town: "Puddlehaven", bays: 4 },
  { name: "Silveracorn Test Centre", town: "Thistleford", bays: 2 },
  { name: "Velvetbrook Test Centre", town: "Thistleford", bays: 3 },
];

export function filterCentres(search = "") {
  const query = search.trim().toLowerCase();
  return centres.filter(({ name, town }) =>
    name.toLowerCase().includes(query) || town.toLowerCase().includes(query)
  );
}
