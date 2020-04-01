<template>

    <body>
            <Fieldset class= "SearchField font-size:5px" legend="Search" :toggleable="true" :collapsed="true">
                <template>
                        <div>
                            <div class="content-section implementation">
                                <Listbox id="listbox" v-model="selectedMovies" :options="movies" :multiple="false" :filter="true" optionLabel="name" aria-hidden= true listStyle="max-height:85px" style="width:17em">
                                    <template #option="slotProps">
                                        <div @click="goToDetailPage(slotProps.option)" class="p-clearfix">
                                            <img :alt="slotProps.option.name" :src= "slotProps.option.imageURL" style="display:inline-block;margin:5px 0 0 5px;width:48px" />
                                            <span style="float:right;margin:1.25em .5em 0 0">{{slotProps.option.name}}</span>
                                        </div>
                                    </template>
                                </Listbox>
                            </div>
                        </div>
                    </template>
            </Fieldset>


	                    <InputText type="text" v-model="searchByName" placeholder="Filter by Name" />   


        <!-- <Paginator :rows="10" :totalRecords="movies.length" :rowsPerPageOptions="[2,4,6]"></Paginator>
                <Paginator :rows="10" :totalRecords="movies.length" :rowsPerPageOptions="[2,4,6]"></Paginator> -->
 
        <div id="dashboard">
            <table id="myTable" pagination: true>
                <tr id="firstRow"> 
                    <th @click="sort('movie_id')">Movieid
                        <i :class= sortIconClassId></i>
                    </th>
                    <th @click="sort('name')">Name
                        <i :class= sortIconClassName></i>
                    </th>
                    <th @click="sort('rating')">Rating
                        <i :class= sortIconClassRating></i>
                    </th>
                    <th @click="sort('year')">Year
                        <i :class= sortIconClassYear></i>
                    </th>
                    <th @click="sort('director')">Director
                        <i :class= sortIconClassDirector></i>
                    </th>
                    <th>Action</th>
                </tr>

                <tr v-for="movie in sortedMovies, filteredMoviesByName" v-bind:key="movie.movie_id">
                    <td>{{movie.movie_id}}</td>
                    <td>{{movie.name}}</td>
                    <td>{{movie.rating}}</td>
                    <td>{{movie.year}}</td>
                    <td>{{movie.director}}</td>
                    <td> 

                    <router-link id="eyeIcon"
                        v-bind:to="{name: 'view-movie', params: {movie_id: movie.movie_id}}">
                        <i class="pi pi-eye" v-bind:to="{name: 'view-movie', params: {movie_id: movie.movie_id}}"></i>
                    </router-link>

                    <i id="iconButton" class="fa fa-search-plus " @click = assignVariables(movie)></i>   

                    <i id="iconPencil" class="pi pi-pencil" @click = editDetails(movie)></i>
                    </td>
                </tr>

            
                <Dialog header="Movie Details" :visible.sync="display" :style="{width: '50vw'}" :modal="true">
                                <div>
                                    <b-card
                                        v-bind:title="name"
                                        v-bind:img-src= "imageURL"
                                        img-alt="Image"
                                        img-top
                                        tag="article"
                                        style="max-width: 16rem;"
                                        class="mb-2"
                                    >
                                        <b-card-text>
                                            <Rating v-model="rating" :cancel="false" :stars="10"/>
                                        </b-card-text>
                                    </b-card>
                                </div>

                                <ul class="collection with-header">
                                    <li class="collection-header"><h4>{{name}}</h4></li>
                                    <li class="collection-item">Movie ID#: {{movie_id}}</li>
                                    <li class="collection-item">Director: {{director}}</li>
                                    <li class="collection-item">Year: {{year}}</li>
                                    <li class="collection-item">Rating: {{rating}}</li>
                                </ul>
                                
                                <template #footer>
                                    <Button label="Yes" icon="pi pi-check" @click="close" />
                                    <Button label="No" icon="pi pi-times" @click="close" class="p-button-secondary"/>
                                </template>
                </Dialog>


                <Dialog header="Edit Movie" :visible.sync="display2" :style="{width: '50vw'}" :modal="true">
                    <div id="edit-movie">
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
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input type="text" v-model="imageURL" required>
                                    </div>
                                </div>
                                <button type="submit" class="btn green">Submit</button>
                                <router-link to="/" class="btn grey">Cancel</router-link>
                            </form>
                        </div>
                    </div>    
                </Dialog>

            </table>

            <div class="fixed-action-btn">
                <router-link to="/new" class="btn-floating btn-large red">
                    <i class="fa fa-plus"></i>
                </router-link>    
            </div>        
        </div>     
    <div>
</div>

    </body>    
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'dashboard',
    data() {
        return {
            currentPage: 1,
            searchByName: '',
            searchByRating: '',
            movies: [],
            searchedName: null,
            movie_id: null,
            name: null,
            director: null,
            rating: null,
            year: null,
            imageURL: null,
            selectedMovies: null,
            display: false,
            display2: false,
            currentSort:'name',
            currentSortDir:'asc',
            sortIconClassName: "ui-sortable-column-icon pi pi-fw pi-sort",
            sortIconClassId: "ui-sortable-column-icon pi pi-fw pi-sort",
            sortIconClassRating: "ui-sortable-column-icon pi pi-fw pi-sort",
            sortIconClassDirector: "ui-sortable-column-icon pi pi-fw pi-sort",
            sortIconClassYear: "ui-sortable-column-icon pi pi-fw pi-sort",
        }  
    },
    created() {

        db.collection('movies').orderBy('rating').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id': doc.id,
                    'movie_id': doc.data().movie_id,
                    'name': doc.data().name,
                    'rating': doc.data().rating,
                    'year': doc.data().year,
                    'director': doc.data().director,
                    'imageURL': doc.data().imageURL,
                }
                this.movies.push(data)
            })
        })
    },
    
    computed:{
        sortedMovies:function() {
            return this.movies.sort((a,b) => {
                let modifier = 1;
                if(this.currentSortDir === 'desc') modifier = -1;
                if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
             });
        },
        filteredMoviesByName: function() {
            return this.movies.filter((movie) => {
                return movie.name.match(this.searchByName);
            });
        }
    },
    methods: {
        open() {
			this.display = true;
		},
		close() {
			this.display = false;
        },
        onSortChange(event){
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        },
        assignVariables(row_item) {
            this.movie_id = row_item.movie_id;
            this.name = row_item.name;
            this.year = row_item.year;
            this.director = row_item.director;
            this.rating = row_item.rating;
            this.imageURL = row_item.imageURL;
            console.log(this.imageURL);
            this.display = true;
        },
        editDetails(paramMovie) {
            this.movie_id = paramMovie.movie_id;
            this.name = paramMovie.name;
            this.year = paramMovie.year;
            this.director = paramMovie.director;
            this.rating = paramMovie.rating;
            this.imageURL = paramMovie.imageURL;
            this.display2 = true;
        },
        updateMovie() {
            
            for(let i =0; i < this.movies.length; i++) {
                if(this.movies[i].movie_id == this.movie_id) {
                    console.log("GIRDIIII");
                    this.movies[i].name = this.name;
                    this.movies[i].rating = this.rating;
                    this.movies[i].year = this.year;
                    this.movies[i].director = this.director;
                    this.movies[i].imageURL = this.imageURL;
                }
            }

            db.collection('movies').where('movie_id', '==', this.movie_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        movie_id:this.movie_id,
                        name: this.name,
                        rating: this.rating,
                        year: this.year,
                        director: this.director,
                        imageURL: this.imageURL
                    })
                    .then(() => {
                        this.display2 = false;
                    })
                })
            })
        },
        item(c) {
            return function() {
                sortTable(c)
            }
        },
        sortTable(c) {
            var table, rows, switching, i, x, y, shouldSwitch;
            table = document.getElementById("myTable");
            switching = true;
            while (switching) {
                switching = false;
                rows = table.rows;
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[c];
                    y = rows[i + 1].getElementsByTagName("TD")[c];
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        },
        goToDetailPage(paramRoute) {
            // this.$router.push({name: 'view-movie'}, params: )
            this.$router.push({name: 'view-movie', params: {movie_id: paramRoute.movie_id}})
        },
        sort: function(s) {
            //if s == current sort, reverse
            if(s === this.currentSort) {
                this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }

            if(this.currentSortDir === 'asc' && s === 'name') {
                this.sortIconClassName = 'ui-sortable-column-icon pi pi-fw pi-sort-up';

                this.sortIconClassId= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassRating="ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassDirector= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassYear= "ui-sortable-column-icon pi pi-fw pi-sort";                
            }
            else if(this.currentSortDir !== 'asc' && s === 'name') {
                this.sortIconClassName = 'ui-sortable-column-icon pi pi-fw pi-sort-down';

                this.sortIconClassId= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassRating="ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassDirector= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassYear= "ui-sortable-column-icon pi pi-fw pi-sort";
            }

            if(this.currentSortDir === 'asc' && s === 'movie_id') {
                this.sortIconClassId = 'ui-sortable-column-icon pi pi-fw pi-sort-up';

                this.sortIconClassRating="ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassDirector= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassYear= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassName= "ui-sortable-column-icon pi pi-fw pi-sort";
            }
            else if(this.currentSortDir !== 'asc' && s === 'movie_id') {
                this.sortIconClassId = 'ui-sortable-column-icon pi pi-fw pi-sort-down';

                this.sortIconClassRating="ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassDirector= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassYear= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassName= "ui-sortable-column-icon pi pi-fw pi-sort";
            }

            if(this.currentSortDir === 'asc' && s === 'rating') {
                this.sortIconClassRating= 'ui-sortable-column-icon pi pi-fw pi-sort-up';

                this.sortIconClassId= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassDirector= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassYear= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassName= "ui-sortable-column-icon pi pi-fw pi-sort";
            }
            else if(this.currentSortDir !== 'asc' && s === 'rating') {
                this.sortIconClassRating = 'ui-sortable-column-icon pi pi-fw pi-sort-down';

                this.sortIconClassId= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassDirector= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassYear= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassName= "ui-sortable-column-icon pi pi-fw pi-sort";
            }

            if(this.currentSortDir === 'asc' && s === 'director') {
                this.sortIconClassDirector= 'ui-sortable-column-icon pi pi-fw pi-sort-up';

                this.sortIconClassId= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassYear= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassName= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassRating="ui-sortable-column-icon pi pi-fw pi-sort";

            }
            else if(this.currentSortDir !== 'asc' && s === 'director') {
                this.sortIconClassDirector = 'ui-sortable-column-icon pi pi-fw pi-sort-down';

                this.sortIconClassId= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassYear= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassName= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassRating="ui-sortable-column-icon pi pi-fw pi-sort";
            }

            if(this.currentSortDir === 'asc' && s === 'year') {
                this.sortIconClassYear= 'ui-sortable-column-icon pi pi-fw pi-sort-up';

                this.sortIconClassDirector= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassId= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassName= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassRating="ui-sortable-column-icon pi pi-fw pi-sort";
            }
            else if(this.currentSortDir !== 'asc' && s === 'year') {
                this.sortIconClassYear = 'ui-sortable-column-icon pi pi-fw pi-sort-down';

                this.sortIconClassDirector= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassId= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassName= "ui-sortable-column-icon pi pi-fw pi-sort";
                this.sortIconClassRating="ui-sortable-column-icon pi pi-fw pi-sort";
            }

        this.currentSort = s;
        }  
    }
}
</script>

<style>

    body {
         /* background-image: url("http://www.sclance.com/backgrounds/best-website-background-color/best-website-background-color_326505.jpg");  */
        /* background-color:#374d58 */
        /* background-color: #F5D6C6 */
        /* background-color: #F3E0BE */
        /* background-color: #EAE6DA */
        background-color: #F0EAD6;
        /* background-color: #2A293E */
    }

    #iconButton {
        border: none; /* Remove borders */
        font-size: 16px; /* Set a font size */
        cursor: pointer; /* Mouse pointer on hover */
        color: teal;
    }

    #iconPencil {
        border: none; /* Remove borders */
        font-size: 18px; /* Set a font size */
        cursor: pointer; /* Mouse pointer on hover */
        color: teal;
    }

    #eyeIcon {
        font-size: 16px; /* Set a font size */
        color: teal;
    }

    #posterImage{
        width: 140px;
    }

    #posterImageTwo{
        width: 215px;
    }

    /* Darker background on mouse-over */
    .iconButton:hover {
        background-color: yellow;
    }

    .p-dropdown {
	width: 12em;
    }

    h3 {
        margin-top:50px;
        color: white;
        background-color: #330000;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23D18'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23FA3' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FA3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
        background-attachment: fixed;
        background-size: cover;
        font-size: 30px;
    }

    #yourWatchlist {
        color: white;
        background-color:brown;
        margin-bottom:0px;
    }

    table{
        width: 100%;
        background: white;
        border: none;
        display: table;
        border-spacing: 0;
    }

    th, caption {
        text-align: left;
    }

    table, th, td {
        border-collapse: collapse
    }

    th, td {
        padding: 0.75rem;
        display: table-cell;
    }

    th {
        cursor:pointer;
        /* background-color: #2a86d1; */
                background-color: rgb(176, 192, 34);
                background-color: rgb(23, 47, 117);

        color:white;

    }

    tr:nth-child(even) {
        background-color: #ffffff;
    }

    tr:nth-child(odd) {
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color:#f2f2f2;
    }

    #dashboard {
        margin-top: 5px;
        background-color: yellow;

    }

    #listbox {
        margin-top: 30px;
        width: 80px;
        margin-left:0px;
        margin-top: 3px
    }

    #searchButton {
        width: 40px;
        height: 44px;
        background-color: rgb(23, 47, 117);
    }

    #searchKey {
        height: 30px;
        width: 150px;
    }

    .p-inputgroup {
        margin-top: 30px;
    }

    body .p-listbox .p-listbox-header .p-listbox-filter-container input {
         box-sizing: border-box;
    }

     .SearchField{
        width: 268px;
        margin-top:40px;
        margin-bottom: 20px;
        color: rgb(23, 47, 117);
        font-size: 3px
    }



</style>

