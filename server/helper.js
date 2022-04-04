exports.configureOptions = (req) => {

  const options = {
    headers: {
      authorization: process.env.TOKEN,
    },
    url: "https://app-hrsei-api.herokuapp.com/api/fec2/rfp" + req.url,
    method: req.method,
    // params: req.query,
    data: req.body
  }
  console.log(process.env.TOKEN)

  return options;
};

//req.url adds all the params at the end...redundant