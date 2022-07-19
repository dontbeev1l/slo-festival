new ModulesLoader()
    .loadModule('random')
    .loadModule('dom')
    .loadModule('background')
    .loadModule('view')
    .loadModule('storage')
    .onload([
        './views.js',
        './aqua.js',
        './main.js'
    ]);
