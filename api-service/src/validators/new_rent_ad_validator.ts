import { body } from 'express-validator';

export const NewRentAdValidate = [
    body('title', 'Need title!')
        .isString().withMessage('Title need to be string!'),

    body('price')
        .isNumeric().withMessage('Price need to be number!'),

    body('houseNumber')
        .isNumeric().withMessage('HouseNumber need to be number!'),

    body('street')
        .isString().withMessage('Street need to be number!'),

    body('country')
        .isString().withMessage('Country need to be number!'),

    body('locality')
        .isString().withMessage('Locality need to be number!'),

    body('localityType')
        .isString().withMessage('LocalityType need to be number!'),

    body('objectType')
        .isString().withMessage('LocalityType need to be number!')
];
