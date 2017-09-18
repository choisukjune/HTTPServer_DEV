var view = function( req, res, d, pathname ){
    global.render_template.render( req, res, d , pathname )
}
module.exports = view;
