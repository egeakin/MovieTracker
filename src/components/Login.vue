<template>
<body>
   <div>
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login card-panel dark red white-text center">
                        <h3>Login</h3>
                        <form>
                            <div class="input-field">
                                <i class="material-icons prefix">email</i>
                                <input type="text" id="email" v-model="email">
                                <label class="white-text" for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input type="password" id="password" v-model="password">
                                <label class="white-text" for="password">Password</label>
                            </div>
                            <Button v-on:click="login" class="p-button-raised p-button-rounded p-button-success" type="login" label="Login"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>   
 </body>   
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'login',
    data: function() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login: function(e) {
           firebase.auth().signInWithEmailAndPassword(this.email, this.password)
           .then(user => {
               alert(`You are logged in as ${user.user.email}`);
               console.log(user.email);
               console.log(this.email)
               this.$router.go({path: this.$router.path});
           },
           err => {
               alert(err.message);
           })
           e.preventDefault();
        }
    }
}
</script>

<style>
    body{
        background-image: url("https://cdn-images-1.medium.com/max/2600/1*lEOjG5403Pg4JOLHr4PtdA.jpeg");
    }
    .login {
        margin-top:150px;
        height: 300px;
        background-image: url("http://www.sclance.com/backgrounds/best-website-background-color/best-website-background-color_326505.jpg");
        border-width: 20px;
        border-color:greenyellow;
        margin-left: 150px;
        width: 550px;
    }
</style>
