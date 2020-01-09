<template>
  <div id="app">
    <div class="container-fluid">
        <div class="row bg-dark">
            <div class="col-lg-12">
                <p class="text-center text-light display-4 pt-2">PHP blog</p>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row mt-3">
            <div class="col-lg-6"><h3 class="text-info">Posts</h3></div>
            <div class="col-lg-6">
                <button class="btn btn-info float-right" @click="showAddForm=true">
                    <i class="fas fa-user"></i>&nbsp;&nbsp; 
                    Add new post
                </button>
            </div>
        </div>
        <hr class="bg-info">
        <Alert v-if="showSuccessMsg" :status="successStatus" :message="successMsg"/>
        <Alert v-if="showErrorMsg" :status="errorStatus" :message="errorMsg"/>
        <div class="row">
            <div class="col-lg-12">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr class="text-center bg-info text-light">
                            <th>ID</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Status</th>
                            <th>Tags</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center" v-for="(post, idx) in posts" :key="idx">
                            <td>{{post.id}}</td>
                            <td>{{post.title}}</td>
                            <td>{{post.content}}</td>
                            <td>{{post.status}}</td>
                            <td>{{post.tags}}</td>
                            <td><a href="#" class="text-success" @click="showEditForm=true; postToEdit=post;"><i class="fas fa-edit"></i></a></td>
                            <td><a href="#" class="text-danger" @click="showDeleteForm=true;postIdToDelete=post.id"><i class="fas fa-trash-alt"></i></a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
      </div>
      <AddPost v-if="showAddForm" @formClosed="addFormClosed" @updatePostsList="getAllPosts" @showResult="showResult"/>
      <EditPost v-if="showEditForm" :postToEdit="postToEdit" @formClosed="editFormClosed"/>
      <DeleteForm v-if="showDeleteForm" :postIdToDelete="postIdToDelete" @updatePostsList="getAllPosts" @showResult="showResult" @formClosed="deleteFormClosed"/>

  </div>
</template>

<script>
import AddPost from './components/AddPost.vue'
import EditPost from './components/EditPost.vue'
import DeleteForm from './components/DeletePostForm.vue'
import Alert from './components/Alert.vue'
import axios from 'axios'

export default {
  name: 'app',
  data: function() {
      return {
        errorMsg: "",
        successMsg: "",
        showSuccessMsg: false,
        showErrorMsg: false,
        successStatus: "alert-success",
        errorStatus: "alert-danger",
        showAddForm: false,
        showEditForm: false,
        showDeleteForm: false,
        posts: [],
        postIdToDelete: '',
        postToEdit: {}
  }},
  components: {
    AddPost,
    EditPost,
    DeleteForm,
    Alert
  },
  mounted: function(){
    this.getAllPosts();
  },
  methods: {
    addFormClosed (value) {
      this.showAddForm = value;
    },
    editFormClosed (value) {
      this.showEditForm = value;
    },
    deleteFormClosed (value) {
      this.showDeleteForm = value;
    },
    getAllPosts(){
        axios.get("/api/posts/readAll.php").then(response => {
          if(response.data.error){
            this.isAlertVisible = true;
            this.errorMsg = response.data.message;
          } else{
            this.posts = response.data.data;
          }
        });
    },
    showResult(data){
      if(data['isError']){
        this.showErrorMsg = true;
        this.errorMsg = data['message'];
      } else{
        this.showSuccessMsg = true;
        this.successMsg = data['message'];
      }
    }
  }
}
</script>