import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { addToUserSpot } from "../utils";

const AddToMySelection = ({ place }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [data, setData] = useState(null);
  const [photo, setPhoto] = useState("");
  const [postForm, setPostForm] = useState(null);

  // const map = useMap();
  const placesLib = useMapsLibrary("places");

  const handleClick = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (!placesLib) return;
    const div = document.createElement("div");
    setPlacesService(new placesLib.PlacesService(div));
    console.log("places.placesservice work!");

    const opt = { id: place.place_id };
    setSummary(new placesLib.Place(opt).editorialSummary);
    console.log(JSON.stringify(summary));
  }, [placesLib]);

  useEffect(() => {
    if (!loading || !placesService) return;
    let placeId = place.place_id;
    const request = {
      placeId: placeId,
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

    console.log("work till now, next getDetails");
    placesService.getDetails(request, (result, status) => {
      if (status === placesLib.PlacesServiceStatus.OK && result) {
        console.log(JSON.stringify(result));

        let img_url = JSON.stringify(result.photos[0].getUrl());
        let photoReference=modify_url(img_url);
        console.log("image reference:", photoReference);
        console.log("image url:", img_url);
        // fetchImage(photoReference);

        // let img_url = JSON.stringify(result.photos[0].getUrl());
        // let try_url = result.photos[0].raw_reference;
        // console.log("the img_url", img_url);
        // console.log("the try_url", JSON.stringify(try_url),try_url);
        // fetchImage(img_url);

        delete result.photos;
        setData(result);
      } else {
        console.log("failed to fetch datails:", status);
      }
    });

    const dataForm = { ...place,...data, ...summary,...photo };
    setPostForm(dataForm);
    console.log(JSON.stringify(dataForm));
    console.log("Does it work here???");
    addToUserSpot(postForm);
  }, [placesService, loading]);

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
        onClick={handleClick}
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

const findIndex = (astring) => {
  let str = astring;
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === "&") {
      count++;
      if (count === 4) {
        return i;
      }
    }
  }
};

const modify_url = (url) => {
  let str = url;
  let part = str.slice(71);

  let cut_from = findIndex(part);
  let photo_reference = part.slice(0, cut_from);
  return photo_reference;
};
