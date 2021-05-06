const multer = require('multer')
const moment = require('moment')

const storege = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){

    }
})
module.exports = multer({})