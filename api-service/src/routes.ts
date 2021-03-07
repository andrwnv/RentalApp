import express from 'express';
import QueryResult from 'pg';

const routes = express.Router();

const pool = new QueryResult.Pool({
    user: 'postgres', host: 'localhost', database: 'coursework_db', password: '852456', port: 5432,
});

routes.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json('Test');
});

routes.get('/users', (req: express.Request, res: express.Response) => {
    pool.query('SELECT * FROM users', (error: Error, result: any) => {
        if ( error ) {
            throw error;
        }

        res.status(200).json(result.rows);
    });
});

routes.post('/users_add', (req: express.Request, res: express.Response) => {
    pool.query('INSERT INTO users(user_name, age) VALUES ($1, $2)', ['name', 12], (error: Error, result: any) => {
        if ( error ) {
            throw error
        }

        res.status(201).json('Confirmed');
    });
});

export default routes;
