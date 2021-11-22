const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createRestaurant = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    rating: Joi.string().required(),
    reviewCount: Joi.string().required(),
    location: Joi.array(),
    menu: Joi.array().items(Joi.object().keys({
      itemName: Joi.string(),
      itemValue: Joi.string(),
      itemCategory: Joi.string(),
    }))
  }),
};

const getRestaurants = {
  query: Joi.object().keys({
    name: Joi.string().min(3),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId),
  }),
};

const updateRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        rating: Joi.string().required(),
        reviewCount: Joi.string().required(),
        location: Joi.array().items(
            Joi.object({
                lat: Joi.string().required(),
                long: Joi.string().required(),
            })
        ),
    })
    .min(1),
};

const deleteRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
