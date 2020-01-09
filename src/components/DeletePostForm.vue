<template>
    <div id="overlay">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete post</h5>
                    <button type="button" class="close" @click="closeWindow">
                        <span aria-hidden="true">
                            &times;
                        </span>
                    </button>
                </div>
                <div class="modal-body p-4">
                    <h4 class="text-danger">Are you sure you want to delete the post?</h4>
                    <h5>You are deleting 'test'</h5>
                    <hr>
                    <button class="btn btn-danger" @click="deletePost">Yes</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-success" @click="closeWindow">No</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "DeletePostForm",
    props: {
        postIdToDelete: {
            type: String,
            required: true
        }
    },
    methods: {
        closeWindow () {
            this.$emit('formClosed', false)
        },
        deletePost(){
            let self = this;
            axios.delete("/api/posts/delete.php", {
                data: {
                    'id': this.postIdToDelete
                }
            }, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(function (response) {
                self.closeWindow();
                self.updatePostsList();
                self.showResult({ "message": response.data.message, "isError": false});
            })
            .catch(function (error) {
                self.showResult({ "message": error, "isError": true});
            });
        },
        updatePostsList(){
            this.$emit('updatePostsList')
        },
        showResult(data){
            this.$emit('showResult', data)
        },
    }
}
</script>