import { assetsApi } from "../../apiService";

export const getWallpaper = async (childId) => {
    await assetsApi.get(`item-property/${childId}/on`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMyIsImlzcyI6ImNvbS5waXRwYXQucGl0dGVycGF0dGVyIiwibmJmIjoxNzIyOTIwNzY3LCJpYXQiOjE3MjI5MjA3NjcsImV4cCI6MTcyMzUyNTU2NywianRpIjoiZTVmMWY0NmQtMWI1OC00M2Y2LTk0MjItYjI1ZTM4MTcwMjcxIn0.foxgOEC0aPsoF00vE_3qkPYgtmRRXKj-Bz3T3NGDrpf2Qti1S_sdm9YyQeiiUGJNRD4gQW7Q3kY_x1IrXF7ZwA'
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