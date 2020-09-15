export const getCoordinates = address => {
  let regex = new RegExp('@(.*),(.*),');
  let lon_lat_match = address.match(regex);
  console.log([lon_lat_match[1], lon_lat_match[2]]);
  return [lon_lat_match[2], lon_lat_match[1]];
};
