function renderIndex(req, res) {
    // Check if the user is logged in
    res.render('index', {
        user: req.session.user || null,
        csrfToken: req.csrfToken()
      });    
}

module.exports = {
    renderIndex
};