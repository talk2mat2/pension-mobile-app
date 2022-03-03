import axios from "axios";
const baseUrl = "https://api.getjarvis.dev/v1";

export default new (class Api {
  Get_retirement_expe_catego = async (token) => {
      console.log(token)
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
  
})();
