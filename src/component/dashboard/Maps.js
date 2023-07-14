import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: 10,
};

const position = {
  lat: -6.998624599999999,
  lng: 113.9434603,
};
const position2 = {
  lat: -7.842191179172154,
  lng: 110.45540269761743,
};

const center = {
  lat: 0,
  lng: -180,
};

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDzNyMoghl7ZW8jIQimrvx2QayXcLP8z7I",
    libraries: ["places"],
  });
  //   const libraries = ["drawing", "places"];

  const [autoComplete, setAutoComplete] = React.useState(null);

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };
  function onPlaceChanged() {
    if (autoComplete !== null) {
      console.log(autoComplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={11}
      onLoad={onLoad}
      //   onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker onLoad={onLoad} position={position} />

      {/* <Marker onLoad={onLoad} position={position2} /> */}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Maps;
