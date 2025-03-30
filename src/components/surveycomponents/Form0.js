import React, { useMemo, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { addToUserSpot, modify_url, getMySelection } from "../../utils";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Space, Divider, Button, message } from "antd";
// import { addToUserSpot} from "../../utils";
// import otherPlaceDetail from "./OtherPlaceDetail";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PlaceAutocomplete from "../mapcomponents/AutocompleteString";
import { APIProvider } from "@vis.gl/react-google-maps";

const Form0 = ({ setDays, spotList, updateStartEnd }) => {
  const [daysNum, setDaysNum] = useState();
  const [numSelectors, setNumSelectors] = useState();
  const [selectedValues, setSelectedValues] = useState({}); // store selected values
  const [spotItems, setSpotItems] = useState(spotList);
  const [openSelects, setOpenSelects] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null); //basic places' details
  const [lastAddedSpotId, setLastAddedSpotId] = useState(null); //store the id of the last added spot
  const [ableToGetMySelection, setAbleToGetMySelection] = useState(false);
  // const onNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // useEffect(()=>{
  //   if(load){
  //     setSpotItems((prevSpotItems) => {
  //       return [...prevSpotItems, {name:selectedPlace.name}];
  //   });}
  // },[load])
  const [placesService, setPlacesService] = useState(null);
  const [placeGM, setPlaceGM] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const photo = useMemo(() => {
    return { photo_reference: "" };
  }, []);
  const summary = useMemo(() => {
    return { edieditorial_summary: "" };
  }, []);

  const places = useMapsLibrary("places");

  useEffect(() => {
    if (selectedPlace) {
      console.log("selectedPlace work!", selectedPlace, places);
    }
  }, [selectedPlace, places]);
  useEffect(() => {
    if (places && selectedPlace) {
      const div = document.createElement("div");
      setPlacesService(new places.PlacesService(div));
      console.log("places.placesservice work!", selectedPlace.place_id);

      setPlaceGM(
        new places.Place({
          id: selectedPlace.place_id,
          requestedLanguage: "en",
        })
      );
    }
  }, [places, selectedPlace]);

  // const handleSelectOpen = () => {
  //   setOpenSelect(true);
  // };
  // const handleSelectOpen = () => {
  //   setOpenSelect(true);
  // };

  // const handleSelectClose = () => {
  //   setOpenSelect(false);
  // };

  useEffect(() => {
    if (
      lastAddedSpotId &&
      Object.values(selectedValues).includes(lastAddedSpotId)
    ) {
      // setOpenSelects(false); // close the select
      setLastAddedSpotId(null); // reset the last added spot id
    }
  }, [selectedValues, lastAddedSpotId]);

  const addItem = (e) => {
    console.log(e);
    e.preventDefault();
    setLoading(true);
    setSpotItems((prevSpotItems) => {
      return [...prevSpotItems, { name: selectedPlace.name, id: Date.now() }];
    });
  };

  useEffect(() => {
    if (!loading) return;
    const request = {
      placeId: selectedPlace.place_id,
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
    console.log("wait for data back");
    console.log(photo);
    console.log(data);
    const dataForm = { ...selectedPlace, ...data, ...summary, ...photo };
    console.log(dataForm);
    console.log(JSON.stringify(dataForm));
    console.log("Does it work here???");
    addToUserSpot(dataForm)
      .then(() => {
        setOpen(true);
        setSelectedPlace(null);
        //   setSpotItems((prevSpotItems) => {
        //     const newSpot = { name: selectedPlace.name, id: dataForm.place_id }; // add the correct id from database
        //     setLastAddedSpotId(dataForm.place_id)
        //     return prevSpotItems.map(spot => spot.name === newSpot.name ? newSpot : spot);
        // })
      })
      .catch((err) => message.error(err.message))
      .finally(() => {
        setLoading(false);
        setAbleToGetMySelection(true);
      });
  };

  useEffect(() => {
    if (!ableToGetMySelection) return;
    getMySelection()
      .then((data1) => {
        let cart = data1.cart_spots;
        setSpotItems((prev) => {
          console.log("Previous spotsList:", prev);
          console.log("New spotsList:", cart);
          return cart;
        });
      })
      .catch((err) => message.error(err.message))
      .finally(() => {
        setAbleToGetMySelection(false);
      });
  }, [ableToGetMySelection]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleNumChange = (value) => {
    setDaysNum(value);
    value = value + 1;
    setNumSelectors(value);
    setSelectedValues((prevState) => ({
      ...prevState, // Keep existing selected values
      ...Array(value)
        .fill()
        .reduce(
          (acc, _, i) => ({ ...acc, [`selector${i + 1}`]: undefined }),
          {}
        ), // Initialize new selectors
    }));
    console.log("*SelecteValue:", selectedValues);
    setOpenSelects([...Array(value)].map(() => false));
    console.log("*OpenSelectes:", openSelects);
  };

  useEffect(()=>{
    if(openSelects){
    
      console.log("OpenSelects:", openSelects);
    }
  },[openSelects])

  const handleSelectChange = (value, key, index) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    
    setOpenSelects((prev) => {
      const newOpenSelects = [...prev];
      newOpenSelects[index] = false; // Close dropdown after selection
      return newOpenSelects;
    });
  };

  useEffect(() => {
    console.log(selectedValues);
    updateStartEnd(selectedValues);
  }, [selectedValues, updateStartEnd]);

  useEffect(() => {
    console.log(spotItems);
  }, [spotItems]);

  const selectorHolder = (i) => {
    if (i === 0) {
      return "Day 1 Start Spot";
    } else {
      return `Day ${i} End Spot`;
    }
  };

  // const handlePlaceSelect = (place) => {
  //   //This is where you handle your propagation
  //   setSelectedPlace(place);
  // };

  // useEffect(() => {
  //   if (!selectedPlace) selectedPlaceFlag = false;
  //   selectedPlaceFlag = true;
  // }, [selectedPlace])

  return (
    <Form layout="vertical">
      <Form.Item
        label="How many days do you plan to travel?"
        layout="horizontal"
      >
        <Input
          placeholder="Type in days (1-7)"
          type="number"
          min={1}
          max={7} // Limit to 15 days
          value={daysNum}
          onChange={(e) => {
            setDays(Number(e.target.value));
            handleNumChange(Number(e.target.value));
          }} // Update days state in parent
        />
      </Form.Item>

      <Form.Item label="Select start and end point">
        {Array(numSelectors)
          .fill()
          .map((_, i) => (
            <Select
              key={`selector${i}`}
              placeholder={selectorHolder(i)}
              defaultValue={selectedValues[`selector${i}`]}
              open={openSelects[i]}
              onDropdownVisibleChange={(open1) => {
                if(open1){
                  setOpenSelects((prev) => {
                    const newOpenSelects = [...prev];
                    newOpenSelects[i] = open1;  // <-- Only modify the i-th item
                    return newOpenSelects;
                  });
                }
              }}
              // onClick={() => {
              //   handleSelectOpen();
              // }}
              // onClose={()=>{handleSelectClose()}}
              onChange={(value) => handleSelectChange(value, `selector${i}`,i)}
              style={{ width: 400, marginRight: 10, zIndex: 1 }}
              dropdownRender={(menu) => (
                <>
                  {/* <div
                    onMouseDown={(e) => {
                      if (!openSelect && selectedPlace) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                  >
                    Some Content
                  </div> */}
                  {menu}
                  <Divider
                    style={{
                      margin: "8px 0",
                    }}
                  />
                  <Space
                    style={{
                      // height: 300,
                      padding: "0 8px 4px",
                      // display: "flex",
                      // direction: "column",
                      // alignItems:'flex-start'
                    }}
                  >
                    {/* <div
                      style={{
                        position: "relative",
                        top:0,
                        left:0,
                        display: "flex",
                        direction: "row",
                        alignItems:'flex-start'
                      }}
                    > */}
                    {/* <AutoInput
                      value={name}
                      changeValue={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                      setNewSpot={setNewSpot}
                    /> */}

                    <APIProvider
                      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    >
                      <div
                        className="form0-autocomplete"
                        style={{
                          position: "absolute",
                          left: "20px",
                          bottom: "20px",
                          width: "250px",
                          height: "15px",
                          border: "1px",
                          outline: "auto",
                          zIndex: "1050",
                        }}
                      >
                        <PlaceAutocomplete
                          onPlaceSelect={setSelectedPlace}
                          onPlace={selectedPlace}
                        />
                      </div>
                    </APIProvider>

                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                      style={{
                        position: "relative",
                        top: "0px",
                        right: "-125px",
                        zIndex: "1200",
                      }}
                    >
                      Add spot
                    </Button>
                    {/* </div> */}
                  </Space>
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
              )}
              options={spotItems.map((item) => ({
                label: item.name,
                value: item.id, //if the object contains id, value:item.originalGid
              }))}
            />
          ))}
      </Form.Item>
    </Form>
  );
};

export default Form0;
