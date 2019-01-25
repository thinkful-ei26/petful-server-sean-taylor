'use strict';

const express = require('express');
const morgan = require('morgan');

const router = express.Router(); 

router.delete('/dog', (req, res, next)) => {
    const { dog } = req.params; 
}
      