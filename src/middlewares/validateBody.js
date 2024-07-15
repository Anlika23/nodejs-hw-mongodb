import createHttpError from 'http-errors';

export const validateBody = (schema) => {
    const func = async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, {
                abortEarly: false,
            });
            next();
        } catch (error) {
            // const errorMessage = error.details.map(detail => detail.message).join(', ');
            const responseError = createHttpError(400, error.message);
            next(responseError);
        }
    };
    return func;
};

