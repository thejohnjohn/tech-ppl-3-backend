import * as Joi from 'joi';

export default function validateData(data: unknown): any{
     const clientSchema: any = Joi.object().keys({
          name: Joi.string().required(),
          phone: Joi.string().required().pattern(/^(\(?\d{2}\)?) ?9?\d{4,5}-?\d{4}$/),
          email: Joi.string().pattern(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
          site: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/),
          CNPJ: Joi.string().required().pattern(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/),
          logo: Joi.string().required()
     });

     return clientSchema.validateData(data);
}