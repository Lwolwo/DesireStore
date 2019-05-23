const { patchPage, patchComponent } = require('./pages/util/miniprogrampatch.js')

Page = patchPage(Page)
Component = patchComponent(Component)

App({})