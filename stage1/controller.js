const getUserIpAddress = async (req) => {
  const userIp = req.ip || "8.8.8.8";
  console.log("User IP:", userIp);
  return userIp;
};

const getUserLocation = async (userIp) => {
  try {
    const response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}&ip=${userIp}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data.city;
  } catch (error) {
    console.log(error);
  }
};

const getUserTemperature = async (city) => {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
  try {
    const response = await fetch(apiUrl + city + `&appid=${process.env.KEY}`);
    const data = await response.json();
    const temprature = Math.round(data?.main?.temp);
    return temprature;
  } catch (error) {
    console.log(error);
  }
};

exports.greeting = async (req, res) => {
  try {
    const visitorName = req.query.visitor_name;
    const ip = await getUserIpAddress(req);
    const location = (await getUserLocation(ip)) || "kumasi";
    const temprature = (await getUserTemperature(location)) || "32";

    if (!visitorName) {
      return res.status(400).json({
        message: "please provide your name!",
      });
    }

    res.status(200).json({
      client_ip: ip,
      location: location,
      greeting: `Hello ${visitorName}!, the temperature is ${temprature} degrees Celcius in ${location}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
