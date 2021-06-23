
const {Router} = require('express');
const router = Router();
const parse = require('../parser');


router.get('/', async (req, res) => {
  try {
    res.json({msg: "Get запрос на /api/search"});
  } catch (e) {
    console.log('Error: ', e.message);
  } 
})

router.post('/', async (req, res) => {
  try {
    const result = await parse(req.body.data);
    // console.log('RESULT=', result.length);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
})

module.exports = router;