import axios from "axios";

export const getBlackList = async () => {
  try {
    const { data } = await axios.get(
      "https://market-api.openocean.finance/v1/blacklist",
      { cache: true }
    );
    return data || [];
  } catch (e) {
    return []; // unsupported pair
  }
};
