import axios from "axios";
const baseUrl = "https://api.getjarvis.dev/v1";

export default new (class Api {
  Get_retirement_expe_catego = async (
    token,
    retireWithSpouse,
    insideLondon
  ) => {
    return await axios
      .get(
        baseUrl +
          `/retirement-expenses/categories?retiringWithSpouse=${retireWithSpouse}&retiringInLondon=${insideLondon}`,
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
    // console.log(JSON.stringify(data));
    // console.log("id", data, id,token);
    return await axios
      .patch(baseUrl + `/retirement-profiles/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
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
      .post(
        baseUrl + `/jars`,
        { data: jarData },
        {
          headers: {
            // "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        throw err?.response?.data;
      });
  };
  update_filled_Jar = async (id,token, jarData) => {
    return await axios
      .put(
        baseUrl + `/jars/${id}`,
        { data: jarData },
        {
          headers: {
            // "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        throw err?.response?.data;
      });
  };
  retrieve_all_jars_Jar = async (token) => {
    return await axios
      .get(baseUrl + `/jars`, {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        throw err?.response?.data;
      });
  };
  Get_retirement_profile_user = async (token, userId) => {
    return await axios
      .get(baseUrl + `/retirement-profiles/${userId}`, {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        throw err?.response?.data;
      });
  };
  get_all_Pension_Providers = async (token) => {
    return await axios
      .get(baseUrl + `/pension-providers`, {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        throw err?.response?.data;
      });
  };
  search_all_Pension_Providers = async (token,search) => {
    return await axios
      .get(baseUrl + `/pension-providers?search=${search}`, {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        throw err?.response?.data;
      });
  };
  search_all_Pension_Employers = async (token,search) => {
    return await axios
      .get(baseUrl + `/employers?search=${search}`, {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        throw err?.response?.data;
      });
  };
})();
