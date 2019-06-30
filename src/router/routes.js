
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'books', component: () => import(`pages/book/Books.vue`) },
      { path: 'book/new', component: () => import('pages/book/Form.vue') },
      { path: 'purchase/new', component: () => import('pages/purchase/Create.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
