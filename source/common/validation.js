// VALIDATION

const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

const productBodyValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
        price: Joi.number().required(),
        category: Joi.string().required()
    })
    return schema.validate(data)
}

const forgotValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email()
    })
    return schema.validate(data)
}

const resetValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email()

    })
    return schema.validate(data)
}

module.exports = {
    registerValidation,
    loginValidation,
    productBodyValidation,
    forgotValidation,
    resetValidation
}
