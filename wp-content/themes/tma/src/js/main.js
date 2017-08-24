'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _vue2Filters = require('vue2-filters');

var _vue2Filters2 = _interopRequireDefault(_vue2Filters);

var _App = require('./modules/App.vue');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueResource2.default);
_vue2.default.use(_vue2Filters2.default);

// Route components


// Create router
var router = new _vueRouter2.default({
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/',
        component: _App2.default,
        name: 'Home'
    }]
});

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new _vue2.default({
    el: '#app',
    router: router
});