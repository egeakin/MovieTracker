<template>
    <div class="content-section implementation dataview-demo">
        <h3 class="first">Top Rated Movies</h3>
        <DataView :value="topRatedMovies" :layout="layout" paginatorPosition="both" :paginator="true" :rows="8" :sortOrder="sortOrder" :sortField="sortField">
            <template #header>
                <div class="p-grid p-nogutter">
                    <div class="p-col-6" style="text-align: left">
                        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By" @change="onSortChange($event)"/>
                    </div>
                    <div class="p-col-6" style="text-align: right">
                        <DataViewLayoutOptions v-model="layout" />
                    </div>
                </div>
            </template>
            <template #list="slotProps" >
                <div class="p-col-12" style="padding: 2em; border-bottom: 1px solid #d9d9d9">
                    <div class="p-grid">
                        <div class="p-col-12 p-md-3">
                            <img id="posterImage" :src="'https://image.tmdb.org/t/p/w500' + slotProps.data.poster_path"/>
                        </div>
                        <div class="p-col-12 p-md-8">
                            <div class="p-grid">
                                <div class="p-col-12">Movie Title: <b>{{slotProps.data.original_title}}</b></div>

                                <div class="p-col-12">Release Date: <b>{{slotProps.data.release_date}}</b></div>

                                <div class="p-col-12">Overview: <b>{{slotProps.data.overview}}</b></div>

                                <div class="p-col-12">Rating: <b>{{slotProps.data.vote_average}}</b></div>

                            </div>
                        </div>
                        <div class="p-col-12 p-md-1 search-icon" style="margin-top: 40px">
                            <Button icon="pi pi-plus"></Button>
                        </div>
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <div style="padding: .5em" class="p-col-12 p-md-3">
                    <Panel :header="slotProps.data.original_title" style="text-align: center">
                        <img id="posterImageTwo" :src="'https://image.tmdb.org/t/p/w500' + slotProps.data.poster_path"/>
                        <div>{{slotProps.data.original_title}}</div>
                        <div>Rating: {{slotProps.data.vote_average}}</div>
                        <hr class="ui-widget-content" style="border-top: 0" />
                        <Button icon="pi pi-plus"></Button>
                    </Panel>
                </div>
            </template>
            
        </DataView>
    </div>


</template>

<script>
import db from './firebaseInit'

export default {
    name: 'top-rated-movies',
    data() {
        return {
            topRatedMovies: [],
            favorites: [],
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                {label: 'Newest First', value: '!release_date'},
                {label: 'Oldest First', value: 'release_date'},
            ]
        }
    },
    mounted: function() {
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=f1efc1d7c82b729eda0634586fcff7bd&language=en-US&page=1',{
            method: 'get'
        })
        .then((response) => {
            return response.json()
        })
        .then((jsonData) => {
            this.topRatedMovies = jsonData.results;
        })
    },
    methods: {
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
        }
    }
}
</script>

<style>
    body {
        /* background-color: rgb(95,113,123); */
        /* background-image: url("http://www.sclance.com/backgrounds/best-website-background-color/best-website-background-color_326505.jpg"); */
        background-color: #F0EAD6;
    }
    
   
</style>
