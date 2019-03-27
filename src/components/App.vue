<template>
  <div id='app' class='flex-center'>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    
    <div class="content">
      <div class="title m-b-md" @click="$router.go(-1)">
          vuejs-gravatar
      </div>
      
      <div>
        <div v-if=!isHasComment>

          <p>
            <span>Email:</span>
            <br>
            <input type="email" v-model="email" placeholder="Your email">
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
import Comment from './Comment.vue'

export default {
  name: 'app',
  data () {
    return {
      comment: 'Welcome to Your Vue.js App',
      email: 'Welcome to Your Vue.js App',
      isHasComment: false,
      finalEmail: '',
      finalComment: ''
    }
  },
   components: {
    Comment
  },
  methods:{
    submitComment(){
      api.get('/avatars/',  { email: this.email })
        .then(response => {
          console.log(response)
          if(response.status === 'failed'){
            //set default image
            this.avatar = "https://image.freepik.com/icones-gratuites/image-d-39-avatar-de-man-pour-le-profil_318-68886.jpg";
            this.isHasComment = false;
          }else{
            this.isHasComment = true;
          }
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.avatar = "https://image.freepik.com/icones-gratuites/image-d-39-avatar-de-man-pour-le-profil_318-68886.jpg";
          this.finalComment = this.comment;
          this.finalEmail = this.email;
          this.isHasComment = true;
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