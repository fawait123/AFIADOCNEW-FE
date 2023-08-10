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
  lat: -7.614529,
  lng: 110.712246,
};

const Maps = ({ datas = [] }) => {
  console.log(datas, "datas");
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

  return isLoaded && datas.length > 0 ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      //   onUnmount={onUnmount}
    >
      {datas.map((item) => {
        return <Marker onLoad={onLoad} position={item} />;
      })}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Maps;
