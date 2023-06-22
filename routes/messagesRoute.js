const { getAllMessage,addMessage} = require('../controllers/messagesControler');

const router = require('express').Router()

router.post('/addmsg/',addMessage);
router.post('/getmsg/',getAllMessage);
module.exports = router;