import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewMovie from '@/components/NewMovie'
import ViewMovie from '@/components/ViewMovie'
import EditMovie from '@/components/EditMovie'
import Login from '@/components/Login'
import Register from '@/components/Register'
import TrendingMovies from '@/components/TrendingMovies'
import TopRatedMovies from '@/components/TopRatedMovies'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/trending-movies',
      name: 'trending-movies',
      component: TrendingMovies,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/top-rated-movies',
      name: 'top-rated-movies',
      component: TopRatedMovies,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-movie',
      component: NewMovie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:movie_id',
      name: 'edit-movie',
      component: EditMovie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:movie_id',
      name: 'view-movie',
      component: ViewMovie,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

//Nav Guards

router.beforeEach((to, from, next) => {
  //Check for requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //Check if not logged in
    if(!firebase.auth().currentUser) {
      //Go to login
      next( {
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Proceed to route
      next();
    } 
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
      //Check if logged in
    if(firebase.auth().currentUser) {
      //Go to login
      next( {
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Proceed to route
      next();
    } 
  } else {
    next()
  }
})

export default router;