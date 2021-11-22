const httpStatus = require('http-status');
const { Restaurant } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Restaurant
 * @param {Object} restaurantBody
 * @returns {Promise<Restaurant>}
 */
const createRestaurant = async (restaurantBody) => {
  if (await Restaurant.isNameTaken(restaurantBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant name already exist');
  }
  restaurantBody.location = {
    type: "Point",
    coordinates: restaurantBody.location
  }
  return Restaurant.create(restaurantBody);
};

/**
 * Query for Restaurants
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRestaurants = async (filter, options) => {
  const restaurants = await Restaurant.paginate(filter, options);
  return restaurants;
};

/**
 * Get Restaurant by id
 * @param {ObjectId} id
 * @returns {Promise<Restaurant>}
 */
const getRestaurantById = async (id) => {
  return Restaurant.findById(id);
};

/**
 * Get restaurant by name
 * @param {string} name
 * @returns {Promise<Restaurant>}
 */
const getRestaurantByName = async (name) => {
  return Restaurant.findOne({ name });
};

/**
 * Update Restaurant by id
 * @param {ObjectId} restaurantId
 * @param {Object} updateBody
 * @returns {Promise<Restaurant>}
 */
const updateRestaurantById = async (restaurantId, updateBody) => {
  const restaurant = await getUserById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  if (updateBody.name && (await Restaurant.isNameTaken(updateBody.name, restaurantId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant already taken');
  }
  Object.assign(user, updateBody);
  await restaurant.save();
  return restaurant;
};

/**
 * Delete Restaurant by id
 * @param {ObjectId} restaurantId
 * @returns {Promise<Restaurant>}
 */
const deleteRestaurantById = async (restaurantId) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  await Restaurant.remove();
  return restaurant;
};

module.exports = {
  createRestaurant,
  queryRestaurants,
  getRestaurantById,
  getRestaurantByName,
  updateRestaurantById,
  deleteRestaurantById,
};
