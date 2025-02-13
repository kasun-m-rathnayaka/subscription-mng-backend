const errorMiddleware = (error, req, res, next) => {
    try {
        let error = {...error}
        error.message = error.message || 'Something went wrong';
        console.error(error);

        //     mongoose bad object id
        if (error.name === 'ValidationError') {
            error.statusCode = 404;
            const message = "Resource not found";
            error = new Error(message);
        }

        //     mongoose duplicate key error
        if (error.code === 11000) {
            error.statusCode = 400;
            const message = "Duplicate field value entered";
            error = new Error(message);
        }

        //     mongoose validation error
        if (error.name === 'ValidationError') {
            error.statusCode = 400;
            const message = Object.values(error.errors).map(val => val.message);
            error = new Error(message);
        }


        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Something went wrong'
        });
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;