<template>
  <div id='app' class='flex-center'>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    
    <div class="content">
      <div class="title m-b-md">
          vuejs-gravatar
      </div>
      
      <div>
        <div v-if=!isHasComment>

          <p>
            <span>Email:</span>
            <br>
            <input type="email" v-model="email" placeholder="Your email">
          </p>

          <p v-if=errorMail id="errorMail">
            invalide mail
          </p>

          <p>
            <span>Comment:</span>
            <br>
            <textarea v-model="comment" placeholder="Your comment"></textarea>
          </p>
          
          
          <p>
             <button v-on:click="submitComment">Submit</button>
          </p>
        </div>
          
        <Comment v-else :email=finalEmail :comment=finalComment :avatar=avatar></Comment>
        
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../main';
import Comment from './Comment.vue';

const DEFAULT_AVATAR_URI = 'http://www.ville-fourqueux.fr/var/ville_fourqueux/storage/images/mediatheque/le-village/le-village-en-images/eglise-sainte-croix/309177-3-fre-FR/Eglise-Sainte-Croix_diaporama-thumbnail.jpg';

export default {
  name: 'app',
  data () {
    return {
      comment: 'Welcome to Your Vue.js App',
      email: 'Welcome to Your Vue.js App',
      isHasComment: false,
      finalEmail: '',
      finalComment: '',
      errorMail:false,
    }
  },
   components: {
    Comment
  },
  methods:{
    submitComment(){
      api.get('/api/avatar/'+this.email)
        .then(response => {
          console.log(response);
          if(response.data.status === 'error'){
            this.isHasComment = false;
            this.errorMail=true;
          }else{
            const uri = response.data.avatar;
            if(uri === ''){
              this.avatar = DEFAULT_AVATAR_URI;
            }else{
              console.log("nya");
              this.avatar=response.config.baseURL+response.data.avatar;
            }
            this.isHasComment = true;
            this.errorMail=false;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.finalComment = this.comment;
          this.finalEmail = this.email;
        });
    }
  } 
}
</script>

<style>
  #app {
      background-color: #fff;
      color: #636b6f;
      font-family: 'Nunito', sans-serif;
      font-weight: 200;
      height: 90vh;
      margin: 0;
  }

  #errorMail{
    color:#F00;
  }

  .full-height {
      height: 90vh;
  }

  .flex-center {
      align-items: center;
      display: flex;
      justify-content: center;
  }

  .position-ref {
      position: relative;
  }

  .top-right {
      position: absolute;
      right: 10px;
      top: 18px;
  }

  .content {
      text-align: center;
  }

  .title {
      font-size: 84px;
  }

  .links > a {
      color: #636b6f;
      padding: 0 25px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: .1rem;
      text-decoration: none;
      text-transform: uppercase;
  }

  .m-b-md {
      margin-bottom: 30px;
  }
</style>
