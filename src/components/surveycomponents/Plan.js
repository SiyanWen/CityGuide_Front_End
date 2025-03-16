import React, { useEffect, useState } from "react";
import Form0 from "./Form0";
import Form1 from "./Form1";
import Form2 from "./Form2";
import { postSurvey } from "../../utils";
import { getMySelection } from "../../utils";
import { Link } from "react-router-dom";
import { Form, Button, message, Steps, theme } from "antd";

// 3 steps to finish setup
const steps = [
  {
    title: "First Question",
    content: <Form0 />,
  },
  {
    title: "Second Question",
    content: <Form1 />,
  },
  {
    title: "Final Question",
    content: <Form2 />,
  },
];

const Plan = ({ spots }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [days, setDays] = useState(1);

  const [surveyInfo, setSurveyInfo] = useState({
    travel_days: 1,
    spots_per_day: 2,
    budgets: { food: 0, transport: 0, ticket: 0, total: 0 },
    start_end_spots: {},
    traffic_mode: {},
  });
  const [startEndSpot, setStartEndSpot] = useState({});
  const [traffic, setTraffic] = useState({});

  useEffect(() => {
    console.log(startEndSpot);
  }, [startEndSpot]);

  useEffect(() => {
    setSurveyInfo((prevState) => ({
      ...prevState,
      travel_days: days,
    }));
  }, [days]);

  useEffect(() => {
    setSurveyInfo((prevState) => ({
      ...prevState,
      start_end_spots: startEndSpot,
    }));
  }, [startEndSpot]);

  useEffect(() => {
    setSurveyInfo((prevState) => ({
      ...prevState,
      traffic_mode: traffic,
    }));
  }, [traffic]);

  useEffect(() => {
    console.log(surveyInfo);
  }, [surveyInfo]);

  // const spots = [
  //   {
  //     name: "Seattle Aquarium ",
  //     // originalGid:"xxxx",
  //     // location: { lat: 47.607559279254026, lng: -122.34299870775699 },
  //   },
  //   {
  //     name: "Space Needle",
  //     // originalGid:"xxxx",
  //     // location: { lat: 47.62009964037968, lng: -122.3490756210929 },
  //   },
  //   {
  //     name: "University of Washington ",
  //     // originalGid:"xxxx",
  //     // location: { lat: 47.65686865308057, lng: -122.30661818625246 },
  //   },
  //   {
  //     name: "Frye Art Museum ",
  //     // originalGid:"xxxx",
  //     // location: { lat: 47.60813784186174, lng: -122.32415216405876 },
  //   },
  //   {
  //     name: "West Point Lighthouse",
  //     // originalGid:"xxxx",
  //     // location: { lat: 47.662946075385655, lng: -122.4358662863737 },
  //   },
  // ];
  const [spotList, setSpotList] = useState(spots); //[]

  // useEffect(() => {
  //   getMySelection()
  //     .then((data) => {
  //       setSpotList(data);
  //     })
  //     .catch((err) => message.error(err.message))
  //     .finally(() => {
  //       deleteProperties();
  //     });
  // }, []);

  // const deleteProperties = () => {
  //   setSpotList((prevState) =>
  //     prevState.reduce((ary, spot) => {
  //       const newObj = { ...spot };
  //       const propertiesToDelete = [
  //         "address"
  //         "id"
  //         "userId",
  //         "rating",
  //         "ratingCount",
  //         "cost",
  //         "durationTime",
  //         "openingHours",
  //         "latitude",
  //         "longitude",
  //         "coverImgUrl",
  //       ];
  //       if (propertiesToDelete.some((key) => newObj[key])) {
  //         // Keep only items that don't have any of the properties to delete
  //         return ary;
  //       }
  //       return [...ary, newObj];
  //     }, [])
  //   );
  // };

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const renderStepContent = () => {
    if (current === 0) {
      return (
        <Form0
          setDays={setDays}
          spotList={spotList}
          updateStartEnd={setStartEndSpot}
        />
      );
    } else if (current === 1) {
      return (
        <Form1
          days={days}
          updateSpotsPerDay={setSurveyInfo}
          updateTraffic={setTraffic}
        />
      );
    } else if (current === 2) {
      return <Form2 updateBudgets={setSurveyInfo} />;
    }
  };

  const handleSendBackInfo = () => {
    postSurvey(surveyInfo)
      .then(() => {
        message.success("Processing complete!");
      })
      .catch((err) => message.error(err.message))
      .finally(() => {
        window.location.href = "/cityguide/planning";
      });
  };

  // interface
  return (
    <div>
      <h2>We're almost there...</h2>
      <p>Help us to plan your trip better:</p>

      <Steps current={current} items={items} />
      <div style={contentStyle}>{renderStepContent()}</div>
      <div style={{ marginTop: 24 }}>
        {/*  */}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}

        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => handleSendBackInfo()}>
            Survey Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Back
          </Button>
        )}
      </div>

      <Form layout="vertical">
        <Form.Item>
          <Button
            type="link"
            onClick={() => {
              if (current < steps.length - 1) {
                return next();
              } else if (current === steps.length - 1) {
                return handleSendBackInfo();
              }
            }}
          >
            Skip
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Plan;
