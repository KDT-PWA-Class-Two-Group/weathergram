export const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("위치 정보 사용 불가"));
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lon = pos.coords.longitude.toFixed(6);
        console.log("위도:", lat, "경도:", lon); // 디버깅용
        resolve({ lat, lon });
      },
      (err) => reject(err)
    );
  });
};