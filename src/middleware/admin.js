export const isAdmin = (req, res, next) => {
    if(req.user && req.user.role)
    {
        next();
    }
    else
    {
        res.status(401).send({message:'Not admin'});
    }
}