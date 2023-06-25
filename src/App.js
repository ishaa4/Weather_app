import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import './App.css';

function App() {


  const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})
  const [error, setError] = useState("");
  const [isSearchClicked, setisSearchClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(isSearchClicked){
      getWetherDetails(inputCity);
    }
  }, [isSearchClicked]);


  const getWetherDetails = (cityName) => {
    setIsLoading(true);
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      setIsLoading(false);
      setData(res.data)
      setError("");
    }).catch((err) => {
      setIsLoading(false);
      setError("City not found. Please enter a valid city name.");
      setData({})
    });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value)
    if(e.target.value.length < 1){
      setisSearchClicked(false);
    }
  }

  const handleSearch = () => {
    setisSearchClicked(true);
  };

  const isButtonDisabled= inputCity.trim() ==="";


  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control"
            value={inputCity}
            onChange={handleChangeInput} />
          <button className="btn btn-primary" type="button"
            onClick={handleSearch} disabled={isButtonDisabled}
          >Search</button>
        </div>
        {isSearchClicked && error && <p className="error loading_text">{error}</p>}

        {isLoading ? (<div className='loading_text'>Loading...</div>) : isSearchClicked && Object.keys(data).length > 0 && !error &&(
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded wetherResultBox">
            <img className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

            <h5 className="weathorCity">
              {data?.name}
            </h5>
            <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;