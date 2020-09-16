export const getCoordinates = address => {
  let regex = new RegExp('@(.*),(.*),');
  let lon_lat_match = address.match(regex);
  console.log([lon_lat_match[1], lon_lat_match[2]]);
  return [lon_lat_match[2], lon_lat_match[1]];
};

export const goToWaze = (latitude, longitude) => {
  window.open(`https://www.waze.com/ul?ll=${latitude},${longitude}&zoom=18`, '_blank');
};

export const goToGoogle = (latitude, longitude) => {
  window.open(`https://www.google.co.cr/maps/@${latitude},${longitude},18z`, '_blank');
};
