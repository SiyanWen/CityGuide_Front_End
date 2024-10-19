// const axios = require('axios');

// const API_KEY= process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// async function getCoordsFromAddress(address){
//     const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);

//     const data=response.data;
//     if(!data || !data.status==="ZERO_RESULTS"){
//         console.log("Failed to fetch data back");
//     }

//     const context=data.results[0];

//     return context;
// }

// module.exports = getCoordsFromAddress;



// const CodeAddress=({selectedPlace})=>{
//     let geocoder = new google.maps.Geocoder();
//     let address = selectedPlace.formatted_address;

//     const[getLocation, setGetLocation]=useState([]);

//     geocoder.geocode({'address':address},
//         function (results,status){
//             if(status==='OK'){
//                 console.log(result[0]);
//                 setGetLocation(result[0].geometry.location);
//             }else{ console.log("falied to get result");}
//         }
//     );

//     return(
//         <>
//             <AdvancedMarker position={getLocation}>
//                 <Pin 
//                     background={"#22ccff"}
//                     borderColor={"#1e89a1"}
//                     glyphColor={"#0f677a"}>
//                 </Pin>
//             </AdvancedMarker>

//             <InfoWindow 
//                 position={getLocation}
//                 maxWidth={200}
//             >
//                 {selectedPlace.name}
//             </InfoWindow>
//         </>
//     );
// };

// export default CodeAddress;