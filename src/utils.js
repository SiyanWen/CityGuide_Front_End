export const login = (credentials) => {
  const loginUrl = `/login?username=${credentials.email}&password=${credentials.password}`;
  // fetch will return something called a Promise
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log in");
    }
    // return response.json(); // Parse and return the response data as JSON
  });
};

export const signup = (data) => {
  const signupUrl = "/signup";

  return fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // convert a JavaScript object (data) into a JSON string representation.
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to sign up");
    }
    // return response.json();
  });
};

export const getUserInfo = () => {
  return fetch("/cityguide/userinfo").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get restaurants");
    }
    return response.json();
  });
};

export const logout = () => {
  const logoutUrl = `/logout`;
  return fetch(logoutUrl, {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log out");
    }
  });
};


export const addToUserSpot = ({spot}) => {
    const obj=JSON.parse(spot);
    const payload = {
        originalGid: obj.place_id,
        name: obj.name,
        description: obj.editorial_summary,
        address: obj.formatted_address,
        type:obj.type,
        rating: obj.rating,
        ratingCount: obj.user_ratings_total,
        cost: obj.price_level,
        durationTime:obj.opening_hours,
        coverImgUrl: obj.photo_reference,
        review: obj.reviews,
        latitude: obj.geometry.location.lat,
        longitude: obj.geometry.location.lng,
    };
  
    return fetch(`/cart/spot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to add spot to MySelection");
      }
    });
  };

  // export const postSurvey = ({survey}) => {
  //   const payload = {
  //       daysToPlay: survey,travel_days,
  //       budget: survey.budgets,
  //       spotsPerday: survey.travel_days,
  //       trafficModes: survey.traffic,
  //       startEndPoint: survey.startEndSpot,
  //   };
  
  //   return fetch("/survey", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   }).then((response) => {
  //     if (response.status < 200 || response.status >= 300) {
  //       throw Error("Fail to add spot to MySelection");
  //     }
  //   });
  // };


export const removeSpotFromMySelection = (spotId) => {
  return fetch(`/cart/spot/${spotId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to delete");
    }
  });
};

export const getMySelection = () => {
  return fetch("/cart").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get MySelection");
    }

    return response.json();
  });
};
