import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.css";
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Loader } from '@googlemaps/js-api-loader';


const loader = new Loader({apiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY, version:'weekly',});

loader.load().then(async()=>
  {const {Map} = await google.maps.importLibrary("maps");
 
  map= new Map(document.getElementById("map"),{
    center:{lat:47.608013,lng:-122.335167,},
    zoom:8,
  });
});

initMap();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
