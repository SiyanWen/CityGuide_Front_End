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
  return fetch("/user/info").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get userinfo");
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

export const addToUserSpot = (spot) => {
  console.log("spot_info:", spot);
  function lat() {
    return spot.geometry.location.lat;
  }
  function lng() {
    return spot.geometry.location.lng;
  }
  const latitude = lat();
  const longitude = lng();
  const payload = {
    original_gid: spot.place_id,
    name: spot.name,
    description: spot.edieditorial_summary,
    address: spot.formatted_address,
    types: spot.types,
    rating: spot.rating,
    rating_count: spot.user_ratings_total,
    cost: spot.price_level,
    opening_hours: spot.opening_hours,
    cover_img_url: spot.photo_reference,
    review: spot.reviews,
    latitude: latitude(),
    longitude: longitude(),
  };
  console.log("payload:", payload);

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

export const postSurvey = (survey) => {
  console.log("survey_info:", survey);
  const payload = {
      daysToPlay: survey.travel_days,
      budget: survey.budgets,
      spotsPerday: survey.spots_per_day,
      trafficModes: survey.traffic_mode,
      startEndPoints: survey.start_end_spots,
  };
  console.log("payload:", payload);

  return fetch("/survey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to post survey");
    }
  });
};

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
  return fetch("/cart")
    .then(async (response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get MySelection");
      }
      const data = await response.json(); // Wait for JSON data
      console.log("getMySelection response data:", data); // Check if data is correct
      return data; // Return the actual data
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};


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

export const modify_url = (url) => {
  let str = url;
  let part = str.slice(71);

  let cut_from = findIndex(part);
  let photo_reference = part.slice(0, cut_from);
  return photo_reference;
};
