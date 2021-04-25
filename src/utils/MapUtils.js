export const getCoordinates = address => {
  let regex = new RegExp('@(.*),(.*),');
  if (!regex.test(address)) {
    return {
      latitude: 0,
      longitude: 0
    };
  }
  let lon_lat_match = address.match(regex);
  return {
    latitude: lon_lat_match[1],
    longitude: lon_lat_match[2]
  };
};

export const getUrl = (latitude, longitude) => {
  return `https://www.google.co.cr/maps/@${latitude},${longitude},18z`;
};

export const goToWaze = (latitude, longitude) => {
  window.open(`https://www.waze.com/ul?ll=${latitude},${longitude}&zoom=18`, '_blank');
};

export const goToGoogle = (latitude, longitude) => {
  window.open(`https://www.google.co.cr/maps/@${latitude},${longitude},18z`, '_blank');
};
