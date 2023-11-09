const axios = require('axios');

exports.main = async (event, callback) => {
  const name = event.inputFields['listing_name'];
  const description = event.inputFields['listing_description'];
  const type = event.inputFields['listing_type'];
  const area = event.inputFields['listing_area'];
  const price = event.inputFields['listing_price'];
  const rooms = event.inputFields['listing_rooms'];
  const image = event.inputFields['listing_image'];

  const data = {
    values: {
      name: name,
      description: description,
      type: [
        {
          name: type,
          type: 'option',
        }
      ],
      area: [
        {
          name: area,
          type: 'option',
        }
      ],
      price: Number(price),
      rooms: rooms,
      image: {
        url: image,
        type: 'image',
      }
    },
    name: name,
  }
  
  const rowID = await axios({
    method: 'post',
    headers: { 
      'content-type': 'application/json', 
      'Authorization': `Bearer ${process.env.HUBDB_TOKEN}` 
	},
    url: `https://api.hubapi.com/cms/v3/hubdb/tables/listings/rows/`,
    data: JSON.stringify(data)
  }).then((response) => {
    console.log(`HubSpot response: ${response.statusText}`)
    return response.data.id
  }).catch((error) => {
    console.log(error)
  })
  
  await axios({
    method: 'post',
    headers: { 
      'content-type': 'application/json', 
      'Authorization': `Bearer ${process.env.HUBDB_TOKEN}` 
    },
    url: `https://api.hubapi.com/cms/v3/hubdb/tables/5365693/draft/publish`
  }).then((response) => {
    console.log(`HubSpot response: ${response.statusText}`)
  }).catch((error) => {
    console.log(error)
  })

  callback({
    outputFields: {
      rowID: rowID
    }
  });
}
