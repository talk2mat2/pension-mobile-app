import axios from "axios";
const baseUrl = "https://api.getjarvis.dev/v1";

export default new (class Api {
  Get_retirement_expe_catego = async (token) => {
    return await axios
      .get(
        baseUrl +
          "/retirement-expenses/categories?retiringWithSpouse=false&retiringInLondon=true",
        {
          headers: {
            // "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  };

  Update_retirement_profile = async (id, token, data) => {
    return await axios
      .patch(baseUrl + `/retirement-profiles/${id}`, data, {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  };

  Calculate_logged_in_user_retirement = async (token) => {
    return await axios
      .get(baseUrl + `/retirement-expenses/calculate`, {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  };
  update_user_profile = async (data, token) => {
    return await axios
      .patch(baseUrl + `/users/me`, data, {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  };

  create_Jar = async (token, jarData) => {
    return await axios
      .post(baseUrl + `/jars`, jarData, {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  };
})();
