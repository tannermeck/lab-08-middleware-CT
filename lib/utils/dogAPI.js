import fetch from 'node-fetch';

const url = 'https://dog-api.kinduff.com/api/facts?number=1';

export default async function getDogFact(){
  const dataURL = url;
  const response = await fetch(dataURL);
  const result = await response.json();
  return result.facts[0];
}

