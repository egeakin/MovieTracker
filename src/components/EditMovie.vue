<template>
    <div id="edit-movie">
        <h3>Edit Movie</h3>
        <div class="row">
            <form @submit.prevent="updateMovie" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="movie_id" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="year" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="director" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="rating" required>
                    </div>
                </div>
                <button type="submit" class="btn green">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>    
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'edit-movie',
    data() {
        return {
            movie_id: null,
            name: null,
            year: null,
            rating: null,
            director:null
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
                    vm.director = doc.data().director;
                    vm.year = doc.data().year;
                    vm.rating = doc.data().rating;
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
                    this.movie_id = doc.data().movie_id;
                    this.name = doc.data().name;
                    this.director = doc.data().director;
                    this.rating = doc.data().rating;
                    this.year = doc.data().year;
                })
            })
        },
        updateMovie() {
            db.collection('movies').where('movie_id', '==', this.$route.params.movie_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        movie_id: this.movie_id,
                        name: this.name,
                        rating: this.rating,
                        year: this.year,
                        director: this.director
                    })
                    .then(() => {
                        this.$router.push({name: 'view-movie', params: {movie_id: this.movie_id}})
                    })
                })
            })
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
