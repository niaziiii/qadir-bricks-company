import axios from 'axios';
import cookie from 'react-cookies'



const getItems = async (str) => {
  const jwt = cookie.load('jwt')

  try {
    const data = await axios({
      method: 'GET',
      url: str,
      headers: { jwt }
    })
    if (!data.status === 200) return;
    return data.data;
  } catch (error) {
    throw error
  }
}

const postItems = async (str, dataObj) => {
  const jwt = cookie.load('jwt')

  try {
    const data = await axios({
      method: 'POST',
      url: str,
      data: dataObj,
      headers: { jwt }
    })

    if (!data.status === 201) throw new Error(data);
    return data;
  } catch (error) {
    throw error
  }
}
const patchItems = async (str, dataObj) => {
  const jwt = cookie.load('jwt')

  try {
    const data = await axios({
      method: 'PATCH',
      url: str,
      data: dataObj,
      headers: { jwt }
    })

    if (!data.status === 201) throw new Error(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  getItems,
  postItems,
  patchItems
}