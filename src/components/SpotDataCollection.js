// import React, { useRef, useEffect, useState } from "react";
// import { useMap,useMapsLibrary } from "@vis.gl/react-google-maps";
// import { addToUserSpot } from "../utils";

// export const spotDataCollect=({place})=>{
//     const map = useMap();
//     const places = useMapsLibrary("places");
//     const pservice= new places.PlacesService(map);

//     const [data,setData]=useState(null);
//     const [photo,setPhoto]=useState(null);
    
//     useEffect(()=>{
//         if(place){
//             let placeId=place.place_id;
//             const request={
//                 placeId:placeId,
//                 fields:['opening-hours','price-level','rating','user_ratings_total','types','reviews','photos']
//             };
        
//             pservice.getDetails(request,function(results,status){
//                 if(status===places.PlacesServiceStatus.OK){
//                     setData(results);
//                     setPhoto(results.photos[0].getUrl());
//                 }else{
//                     console.log('failed to fetch places details');
//                 }
//             })
        
//             const newData= {...data};
//             delete newData.photos; 
//             setData(newData);
        
//             const dataForm={...place,...data,...photo};
//             JSON.stringify(dataForm);

//             // addToUserSpot(dataForm)
//         }
//     },[place]);

//     return;
// };
