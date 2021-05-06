module.exports = (res,error) =>{
    res.status(500).json({
        succsess:false,
        message:error.message ? error.message :error
    })
}
