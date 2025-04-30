import { validationResult } from 'express-validator';

function handleValidationErrors(req, res, view) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render(view, {
            csrfToken: req.csrfToken(),
            errors: errors.array(),
            old: req.body 
        });
    }
    return null;
}


export default handleValidationErrors;