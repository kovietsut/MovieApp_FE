import axiosInstance from "./api";

class MovieApi {
  getList = async () => {
    const response = await axiosInstance.get("/movie/getList", {
      pageNumber: 1,
      pageSize: 100,
    });
    if (response.isSuccess && response.data) {
      return response;
    }
  };
}

export const movieApi = new MovieApi();
