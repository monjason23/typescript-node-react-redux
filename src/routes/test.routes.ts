import express from 'express';
import { testServer } from '../controllers/test.controller';

const router = express.Router();

router.route('/').get(testServer);

export default router;

