import Joi from "joi"

const FullnameSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
});

const AddressSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required()
});

const OrderSchema = Joi.object({
    productName: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
});

 const UserJoiSchema = Joi.object({
    userId: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    fullName: FullnameSchema.required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    isActive: Joi.boolean().default(true),
    hobbies: Joi.array().items(Joi.string()).required(),
    address: AddressSchema.required(),
    orders: Joi.array().items(OrderSchema)
});
export default UserJoiSchema;