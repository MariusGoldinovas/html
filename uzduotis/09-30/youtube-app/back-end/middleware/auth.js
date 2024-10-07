export function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();  // User is authenticated
    }
    return res.status(401).json({ message: 'Unauthorized' });
}