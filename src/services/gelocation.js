export async function requestPermissionLocation() {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(result => {
      const { coords } = result;

      resolve(coords);
    }, reject);
  });
}

export async function checkPermissionLocation() {
  if (!navigator) return;
  if (!navigator.permissions) return;

  const result = await navigator.permissions.query({ name: 'geolocation' });

  return result.state;
}

export function setLatLnt(lat, lng, name = null) {
  localStorage.setItem('latLng', JSON.stringify({ lat, lng, name }));
}

export function getLatLnt() {
  let result = null;

  try {
    result = JSON.parse(localStorage.getItem('latLng'));
  } catch (e) {}

  return result;
}

export function clearLatLnt() {
  localStorage.removeItem('latLng');
}

export function convertKelvinToCelsius(kelvin) {
  const celsius = Math.round(kelvin - 273.15);

  return celsius;
}
