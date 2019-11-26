 // Call gocode
    // geocode();

    // Get location form
    const locationForm = document.getElementById('location-form');
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    // Listen for submit
    locationForm.addEventListener('submit', geocode);

    function geocode(e){
        // Prevent actualsumit
        e.preventDefault();
      var address = document.getElementById('location-input').value;

      axios.get('http://www.mapquestapi.com/geocoding/v1/address',{
          params:{
              key:'dfJjybJeDcPT23mZu3FWpoLdZcdQh0td',
              location:address
          }
      })
      .then(function(response){
          // Log full reponse
        console.log(response);

        // Formatted Address
        var latitude = response.data.results[0].locations[0].latLng.lat;
        // document.getElementById('lat').textContent = latitude;

        var longitude = response.data.results[0].locations[0].latLng.lng;
        // document.getElementById('long').textContent = longitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api=`${proxy}https://api.darksky.net/forecast/93463444821e6e23f93583478eef6301/${latitude},${longitude}`;

        fetch(api).then(response =>{
            return response.json();
        }).then(data =>{
            console.log(data);
            const {temperature, summary} = data.currently;

            // Set DOM Elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone; 
            
            // Formula for Cesius
            let celsius = (temperature - 32) * (5 / 9);
            console.log(Math.floor(celsius));
            
            // Change temperature to Celsius/Farenheit
            temperatureSection.addEventListener('click', () =>{
                if(temperatureSpan.textContent === 'F'){
                    temperatureSpan.textContent = 'C';
                    temperatureDegree.textContent = `${Math.floor(celsius)}`;
                } else{
                    temperatureSpan.textContent = 'F';
                    temperatureDegree.textContent = temperature;
                }
            })
            
        });

        const api2=`${proxy}https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today`;

        fetch(api2).then(response =>{
            return response.json();
        }).then(data =>{
            console.log(data.results.sunrise);
            console.log(data.results.sunset);
            document.getElementById('sun-rise').textContent = data.results.sunrise;
            document.getElementById('sun-set').textContent = data.results.sunset;
        })
      })
      .catch(function(error){
        console.log(error);
      });
    };

    // Rocket
    function blastOff(){
        const rocket = document.querySelector('.rocket');
        rocket.classList.add('flying');

        const ship = document.querySelector('.ship');
        ship.classList.add('departing');
    }

    function fadeIn(className, delayMS){
        setTimeout(_ => {
            const button = document.querySelector(`.${className}`)
        }, delayMS)
    }

    fadeIn('button', 1000);

    // console.log(latitude);



    // axios.get('https://api.darksky.net/forecast/93463444821e6e23f93583478eef6301/',{
    //       params:{
    //           key:'dfJjybJeDcPT23mZu3FWpoLdZcdQh0td',
    //           lat:  ,
    //           long: 
    //       }
    //   })
    //   .then(function(response){
    //     // Log full reponse
    //     console.log(response);
    //   })
    //   .catch(function(error){
    //     console.log(error);
    //     });
    // };


    