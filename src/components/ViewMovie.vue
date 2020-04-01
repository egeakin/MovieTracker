<template>
    <div id="view-movie">

        <div>
            <b-card id="card"
                v-bind:title="name"
                v-bind:img-src= "imageURL"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
            <b-card-text>
                 <Rating readonly= "true" v-model="rating" :cancel="false" :stars="10"/>
            <!-- <form @submit.prevent="submitRating">
                <Rating v-model="rating" :cancel="false" :stars="10"/>
                <Button label="Submit Rating" @click="submitRating()"/> 
            </form>  
            Rating: {{rating}} -->
        </b-card-text>

        <!-- <b-button href="https://is1-ssl.mzstatic.com/image/thumb/Video123/v4/86/0c/95/860c956f-382b-8a5b-d39e-f90bb2782bd2/pr_source.lsr/268x0w.png" variant="primary">Full Poster</b-button> -->
            </b-card>

        </div >
        <ul id="infoCard" class="collection with-header">
            <li class="collection-header"><h4>{{name}}</h4></li>
            <li class="collection-item">Movie ID#: {{movie_id}}</li>
            <li class="collection-item">Director: {{director}}</li>
            <li class="collection-item">Year: {{year}}</li>
            <li class="collection-item">Rating: {{rating}}</li>
        </ul>

        <h3>Comments</h3>
    
        <ul id="comments">
            <li v-for="(item,index) in comments" :key="index">
                <Panel id="commentPanel" :header= "email">
                    {{item}}
                </Panel>
            </li>
        </ul>


        <form @submit.prevent="submitComment">
            <div class="content-section implementation" >
                <h3 class="first">Enter a comment:</h3>
                <TextArea v-model="comment" rows="5" cols="30" />
            </div>

            <Button id="submitCommentButton" label="Submit Comment"></Button>
        </form>

        <router-link to="/" class="btn grey">Back</router-link>
        <button @click="deleteMovie" class="btn red">Delete</button>

        <div class="fixed-action-btn">
            <router-link v-bind:to="{name: 'edit-movie', params: {movie_id: movie_id}}" class="btn-floating btn-large red">
                <i class="fa fa-pencil"></i>
            </router-link>    
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'view-movie',
    data() {
        return {
            movie_id: null,
            name: null,
            director: null,
            rating: null,
            year: null,
            imageURL: null,
            comments:null,
            favorites: null,
            comment: null,
            currentUser: false

        }
    },
    created(){
        if(firebase.auth().currentUser) {
            this.currentUser = firebase.auth().currentUser.email
        }
    },
    beforeRouteEnter(to, from, next) {
        db.collection('movies').where('movie_id',
        '==', to.params.movie_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.movie_id = doc.data().movie_id;
                    vm.name = doc.data().name;
                    vm.rating = doc.data().rating;
                    vm.year = doc.data().year;
                    vm.director = doc.data().director;
                    vm.imageURL = doc.data().imageURL;
                    vm.comments = doc.data().comments;
                    vm.favorites = doc.data().favorites;
                })
            })
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() { 
            db.collection('movies').where('movie_id', '==', this.$route.params.movie_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.movie_id = doc.data().movie_id
                    this.name = doc.data().name
                    this.year = doc.data().year
                    this.director = doc.data().director
                    this.rating = doc.data().rating
                    this.imageURL = doc.data().imageURL
                    this.comments = doc.data().comments
                    this.favorites = doc.data().favorites
                })
            })
        },
        deleteMovie() {
            if(confirm('Are you sure?')) {
                db.collection('movies').where('movie_id', '==', this.$route.params.movie_id).get()
                .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete()
                    this.$router.push('/')
                })
            })
            }
        },
        getImageURL() {
            console.log(this.imageURL)
            return this.imageURL
        },
        submitRating() {
            db.collection('movies').where('movie_id', '==', this.$route.params.movie_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        rating: this.rating
                    })
                })
                .then(() => {
                    this.$router.push('/')
                })
            })
        },
        submitComment() {
            this.comments.push(this.comment);

            db.collection('movies').where('movie_id', '==', this.$route.params.movie_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        comments: this.comments
                    })
                })
                .then(() => {
                    this.$router.push('/')
                })
            })
        }
    }
}
</script>

<style>

    #comments {
        margin-top:30px;
    }

    #commentPanel {
       color: red;
    }

    #submitCommentButton {
        margin-top:10px;
        margin-bottom: 30px;
    }
    
    #infoCard {
        margin-top: 20px;
    }

    #card {
        margin-top: 30px;
    }

</style>
