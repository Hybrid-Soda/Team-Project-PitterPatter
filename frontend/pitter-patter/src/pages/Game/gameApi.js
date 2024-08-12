import { assetsApi } from "../../apiService";
import { useSelector } from "react-redux";
 
export const getWallpaper = async (childId) => {
    const token = useSelector((state) => state.token.accessToken);
    await assetsApi.get(`item-property/${childId}/on`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res);
      console.log(res.data[0].photo);
      return res.data[0].photo;
    })
    .catch((err) => {
      console.log(err);
    });
  };