export const addSpotToMySelection = (spot) => {
    const payload = {
        original_spot_gid: spot.place_id,
        name: spot.name,
        description: spot.WHAT,
        address: spot.formatted_address,
        rating: spot.WHAT,
        rating_count: spot.WHAT,
        cost: spot.WHAT,
        duration_time:spot.WHAT,
        image_url: spot.photo[0],
        review: spot.WHAT,
        lat: spot.geometry.location.lat,
        lng: spot.geometry.location.lng,
    };
  
    return fetch(`/`, {
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