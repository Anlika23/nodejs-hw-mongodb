import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res) => {
    if (err instanceof HttpError) {
        res.status(err.status).json({
            status: err.staus,
            message: err.name,
            data: err,
        });
        return;
    }
    res.staus(500).json({
        status: 500,
        massage: 'Somethang went wrong',
        data: err.message,
    });
};
