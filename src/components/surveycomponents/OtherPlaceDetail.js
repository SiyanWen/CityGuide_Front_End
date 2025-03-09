import React, { useEffect, useState, useMemo } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { addToUserSpot, modify_url } from "../../utils";
import { message } from "antd";

const otherPlaceDetail = ({ place }) => {
  const [placesService, setPlacesService] = useState(null);
  const [placeGM, setPlaceGM] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const photo = useMemo(() => {
    return { photo_reference: "" };
  }, []);
  const summary = useMemo(() => {
    return { edieditorial_summary: "" };
  }, []);

  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !place) return;
    const div = document.createElement("div");
    setPlacesService(new places.PlacesService(div));
    console.log("places.placesservice work!", place.place_id);

    setPlaceGM(
      new places.Place({ id: place.place_id, requestedLanguage: "en" })
    );
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [places, place, loading]);

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
    console.log(placeGM.editorialSummary);
    placesService.getDetails(request, (result, status) => {
      if (status === places.PlacesServiceStatus.OK && result) {
        console.log(JSON.stringify(result));

        let img_url = JSON.stringify(result.photos[0].getUrl());
        let reference = modify_url(img_url);
        photo["photo_reference"] = `${reference}`;
        delete result.photos;
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
      addToUserSpot(dataForm)
        .then(() => {
          setOpen(true);
        })
        .catch((err) => message.error(err.message))
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  };

  return (
    <>
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
    </>
  );
};
export default otherPlaceDetail;
