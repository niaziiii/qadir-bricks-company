import axios from 'axios';



const getItems = async (str) => {
  try {
    const data = await axios({
      method: 'GET',
      url: str,
    })
    if (!data.status === 200) return;
    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

const postItems = async (str,dataObj) => {
  try {
    const data = await axios({
      method: 'POST',
      url: str,
      data : dataObj
    })

    if (!data.status === 201) throw new Error(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
const patchItems = async (str,dataObj) => {
    try {
      const data = await axios({
        method: 'PATCH',
        url: str,
        data : dataObj
      })
  
      if (!data.status === 201) throw new Error(data);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

export {
  getItems,
  postItems,
  patchItems
}