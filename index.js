
global.ROOTPath = __dirname;
//console.log( __dirname )
//console.log( global.ROOTPath )

require('./lib/modules.js')
require('./render/template_use.js')
require('./server/router');
require('./server/server');



//server.start(router.routerControl);
global.SERVER.serverStart( global.ROUTER.routerControl )
