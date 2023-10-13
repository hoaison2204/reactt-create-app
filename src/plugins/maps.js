export default async (_, inject) => {
  inject("maps", {
    mapsUrl(latitude = "", longitude = "") {
      if (!latitude) return latitude;
      if (!longitude) return longitude;
      return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    },
    mapsImage(latitude = "", longitude = "", iconNo) {
      if (!latitude) return latitude;
      if (!longitude) return longitude;
      return encodeURI(
        process.env.VUE_APP_MAP_API +
          `/bs-map-api/mapimage?subSystemCode=bsff&center=${latitude},${longitude}&zoom=17&size=600x400&maptype=1&orgMarker=${latitude},${longitude},${iconNo}`
      );
    },
  });
};
