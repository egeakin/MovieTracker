<template>
    <nav>
        <div class="nav-wrapper">
        
                <div class="container">
                    <Sidebar id="sidebar" :visible.sync="visibleLeft">
                        {{currentUser}}
                        <div v-if="isLoggedIn"><button id="logoutButton" v-on:click="logout" class="btn">Logout</button></div>
                        <template>
                            <div>
                               <div class="content-section implementation">
                                    <h3>On Theaters</h3>
		                        </div>
                                <b-card
                                    :title= nowPlaying[index].original_title
                                    :img-src= "'https://image.tmdb.org/t/p/w500' +nowPlaying[index].poster_path"
                                    img-alt="Image"
                                    img-top
                                    tag="article"
                                    style="max-width: 20rem;"
                                    class="mb-2"
                                >
                                    <b-card-text id="cardText">
                                        {{nowPlaying[index].overview}}
                                    </b-card-text>

                                    <b-button @click="index++" href="#" variant="primary">Next Movie</b-button>
                                </b-card>
                            </div>
                        </template>
                    </Sidebar>

                <Button id= "panelButton" icon="pi pi-bars" @click="visibleLeft = true" />

                <img id="logo" src="https://camo.githubusercontent.com/2aa80b22eb3715c7f03ce78fb8e3de433b49f4cf/68747470733a2f2f7777772e7072696d6566616365732e6f72672f77702d636f6e74656e742f75706c6f6164732f323031392f30352f7072696d657675652d6c6f676f2d3230302e706e67">
                <router-link to ="/" class ="brand-logo">Watclist</router-link>
                <ul class="right">
                    <li v-if="isLoggedIn"><span class= "email black-text">{{currentUser}}</span></li>
                    <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>
                    <li><router-link to="/top-rated-movies">Top Rated</router-link></li> 
                    <li><router-link to="/trending-movies">Trending</router-link></li> 
                    <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
                    <li v-if="isLoggedIn"><button id="logoutButton" v-on:click="logout" class="btn">Logout</button></li>
                </ul>   
            </div>   
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'navbar',
    data() {
        return {
            isLoggedIn: false,
            currentUser: false,
            visibleLeft: false,
            nowPlaying: null,
            slide: 0,
            sliding: null,
            index: 0
            
        }
    },
    created(){
        if(firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.email
        }
    },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$router.go({path: this.$router.path});
            })
        },
        onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }

    },
    mounted: function() {
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=f1efc1d7c82b729eda0634586fcff7bd&language=en-US&page=1', {
            method: 'get'
        })
        .then((response) => {
            return response.json()
        })
        .then((jsonData) => {
            this.nowPlaying = jsonData.results;
        })
    },
    
}
</script>

<style scoped>
    .email {
        padding-right: 10px;
    }
    nav{
        height: 60px;
        background-color: #330000;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23D18'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23FA3' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FA3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
        background-attachment: fixed;
        background-size: cover;
   }
    #logo {
        width: 25px;
    }
    .brand-logo{
        margin-left:10px;
    }

    #panelButton {
        margin-left: -250px;
        margin-right: 100px;
        background-color:  transparent
    }

    #logoutButton {
        margin-left: 10px;
        background-color:  rgb(105, 161, 13);
        margin-top: -40px;
    }

    #sidebar {
        background-color:#d9deea
        
    }

    h3 {
        margin-top: 15px;
        margin-bottom: 10px;
    }

    #cardText {
        font-size: 13px;
        line-height: 1;
    }

</style>
