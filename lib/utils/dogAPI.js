import fetch from 'node-fetch';

const url = 'https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=';

export default async function getDogFact(){
  const number = Math.ceil(Math.random() * 100);
  const dataURL = url + number;
  const response = await fetch(dataURL);
  const result = await response.json();
  return result[0].fact;
}

