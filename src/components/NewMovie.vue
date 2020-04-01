<template>
    <div id="new-movie">
        <h3>New movie</h3>
        <div class="row">
            <form @submit.prevent="saveMovie" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="movie_id" required>
                        <label>Movie ID:</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label>Name:</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="year" required>
                        <label>Year:</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="rating" required>
                        <label>Rating:</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="director" required>
                        <label>Director:</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="imageURL" required>
                        <label>Poster image URL:</label>
                    </div>
                </div>
                
                
                <button type="submit" class="btn">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>    
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'new-movie',
    data() {
        return {
            movie_id: null,
            name: null,
            rating: null,
            year: null,
            director: null,
            imageURL: null,
            comments: null,
            favorites: null
        }
    },
    methods: {
        saveMovie() {
            db.collection('movies').add({
                director: this.director,
                movie_id: this.movie_id,
                name: this.name,
                rating: this.rating,
                year: this.year,
                imageURL: this.imageURL,
                comments: this.comments,
                favorites: this.favorites
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
}
</script>

</<style>
    .row {
        margin-top: 20px;
        background-color:white;
    }

    h3 {
        margin-top: 20px;
        color: white;
    }



</style>
