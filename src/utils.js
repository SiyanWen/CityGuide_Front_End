export const login = (credentials) => {
  const loginUrl = `/login?email=${credentials.email}&password=${credentials.password}`;
  // fetch will return something called a Promise
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log in");
    }
    return response.json(); // Parse and return the response data as JSON
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
    return response.json();
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
    if (response.status !== 204) {
      throw Error("Fail to log out");
    }
  });
};

export const addToUserSpot = (spot) => {
    const payload = {
        original_spot_gid: spot.place_id,
        name: spot.name,
        description: spot.editorial_summary,
        address: spot.formatted_address,
        type:spot.type,
        rating: spot.rating,
        rating_count: spot.user_ratings_total,
        cost: spot.price_level,
        duration_time:spot.opening_hours,
        image_url: spot.photo,
        review: spot.reviews,
        lat: spot.geometry.location.lat,
        lng: spot.geometry.location.lng,
    };
  
    return fetch(`/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to add spot to MySelection");
      }else{return true}
    });
  };