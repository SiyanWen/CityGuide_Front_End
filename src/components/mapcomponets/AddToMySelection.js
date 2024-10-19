import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { addToUserSpot } from "../../utils";

const AddToMySelection = ({ place }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [placesService, setPlacesService] = useState(null);
  const [data, setData] = useState(null);
  const [baseinfo,setBaseinfo]=useState(place);
  const [summary, setSummary] = useState("");
  const [photo, setPhoto] = useState("");

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
    let a_summary_string=new placesLib.Place(opt).editorialSummary;
    setSummary(`[editorial_summary]:${a_summary_string}`);
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
        let photo_reference = modify_url(img_url);
        setPhoto(`[photo_reference]:${photo_reference}`);
        // console.log("image reference:", photoReference);
        // console.log("image url:", img_url);
        // fetchImage(photoReference);

        delete result.photos;
        setData(result);
      } else {
        console.log("failed to fetch datails:", status);
      }
    });
  }, [placesService, loading]);

  const postDataBack=()=>{
    const dataForm = { ...baseinfo, ...data, ...summary, ...photo};
    console.log(JSON.stringify(dataForm));
    console.log("Does it work here???");
    addToUserSpot(dataForm)
      .then(()=>{setOpen(true);})
      .catch((err)=>console.log(err.message))
      .finally(()=>{setLoading(false);})
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
        onClick={()=>{
          handleClick();
          setTimeout(()=>{console.log("wait for data back")},1500);
          postDataBack();}}
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
