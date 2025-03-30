import React, { useEffect, useState, useMemo } from "react";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import { message } from "antd";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { addToUserSpot, modify_url } from "../../utils";

// import { writeFileSync } from 'fs';

const AddToMySelection = ({ place }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [placesService, setPlacesService] = useState(null);
  const [placeGM, setPlaceGM] = useState(null);
  const [data, setData] = useState(null);
  // const [photo,setPhoto]=useState();
  // const [pid, setPid] = useState(null);
  // const [str, setStr]=useState(null);

  const summary = useMemo(() => {
    return { edieditorial_summary: "" };
  }, []);
  const photo = useMemo(() => {
    return { photo_reference: "" };
  }, []);

  // const map = useMap();
  const placesLib = useMapsLibrary("places");

  const handleClick = () => {
    setLoading(true);
  };

  // useEffect(()=>{
  //   if(!place)return;
  //   setPid(place.place_id)
  //   console.log(place.place_id);
  // },[place]);

  useEffect(() => {
    if (!placesLib || !place) return;
    const div = document.createElement("div");
    setPlacesService(new placesLib.PlacesService(div));
    console.log("places.placesservice work!", place.place_id);

    setPlaceGM(
      new placesLib.Place({ id: place.place_id, requestedLanguage: "en" })
    );
  }, [placesLib, place]);

  useEffect(() => {
    if (!loading) return;

    const request = {
      placeId: place.place_id,
      fields: [
        "opening_hours",
        "price_level",
        "rating",
        "user_ratings_total",
        "types",
        "reviews",
        "photos",
      ],
    };
    const another_req = { fields: ["editorialSummary"] };
    placeGM.fetchFields(another_req);
    let str = placeGM.editorialSummary;
    summary["edieditorial_summary"] = `${str}`;
    // setStr(placeGM.editorialSummary);
    console.log(placeGM.editorialSummary);
    // const fetchImage = async (photoReference) => {
    //   const photoUrl= `https://maps.googleapis.com/maps/api/place/photo`
    //                   +`?maxwidth=400&photoreference=${photoReference}`
    //                   +`&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    //   try {
    //     const response = await fetch(photoUrl);
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const blob = await response.blob();
    //     const objectURL = URL.createObjectURL(blob);
    //     console.log("fetch image does work here");
    //     console.log(JSON.stringify(objectURL));
    //     setPhoto(objectURL);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // const fetchImage = async (url) => {
    //   try {
    //     const response = await fetch(url);
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const blob = await response.blob();
    //     const objectURL = URL.createObjectURL(blob);
    //     fetch(objectURL)
    //       .then((res) => res.text())
    //       .then((data) => {
    //         console.log(data);
    //       });
    //   } catch (error) {
    //     console.error("Error fetching image:", error);
    //   }
    // };

    console.log("work still now, next getDetails");
    placesService.getDetails(request, (result, status) => {
      if (status === placesLib.PlacesServiceStatus.OK && result) {
        console.log(JSON.stringify(result));
        let img_url;
        if ("photos" in result) { 
          img_url = JSON.stringify(result.photos[0].getUrl()); 
          let reference = modify_url(img_url);
          photo["photo_reference"] = `${reference}`;
          // setPhoto(reference);
          console.log("image reference:", reference);
          // console.log("image url:", img_url);
          // fetchImage(photoReference);
          delete result.photos;
        }

        console.log("Check if result alright: ", result);
        if (data === null) {
          setData(result);
        }
        console.log("Check if setData success: ", data);
      } else {
        console.log("failed to fetch datails:", status);
      }
      if (data !== null) {
        postDataBack();
      }
    });
  }, [loading, data]);

  const postDataBack = () => {
    setTimeout(() => {
      console.log("wait for data back");
      console.log(photo);
      console.log(data);
      const dataForm = { ...place, ...data, ...summary, ...photo };
      console.log(dataForm);
      console.log(JSON.stringify(dataForm));
      console.log("Does it work here???");
      // const JSONToFile = (obj, filename) =>
      //   writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));
      // JSONToFile(dataForm, 'spots');

      addToUserSpot(dataForm)
        .then(() => {
          setOpen(true);
        })
        .catch((err) => message.error(err.message))
        .finally(() => {
          setLoading(false);
        });

      // setOpen(true);
      // setLoading(false);
    }, 1000);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <LoadingButton
        size="small"
        color="secondary"
        onClick={() => {
          handleClick();
        }}
        loading={loading}
        loadingPosition="start"
        startIcon={<AddIcon />}
        variant="contained"
      >
        AddToMySelection
      </LoadingButton>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Add success!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddToMySelection;
