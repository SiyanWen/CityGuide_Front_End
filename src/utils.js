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