import express from 'express';
import { pollController } from '../controllers/pollCountroller';
const router = express.Router();

router.post('/createPoll',pollController.createPoll.bind(pollController));
router.get('/getPolls',pollController.getPolls.bind(pollController));
router.get('/getPollsById', pollController.getPollsById.bind(pollController));

export default router;