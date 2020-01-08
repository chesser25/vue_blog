<template>
    <div id="overlay">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{formName}}</h5>
                    <button type="button" class="close" @click="closeWindow">
                        <span aria-hidden="true">
                            &times;
                        </span>
                    </button>
                </div>
                <div class="modal-body p-4">
                    <form @submit.prevent="formSubmit">
                        <div class="form-group">
                            <input type="text" v-model="title" name="title" class="form-control form-control-lg" placeholder="Title"/>
                        </div>
                        <div class="form-group">
                            <textarea type="text" v-model="content" name="content" class="form-control form-control-lg" placeholder="Content"></textarea>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <select class="selectpicker form-control" v-model="currentStatus">
                                        <option disabled>Status</option>
                                        <option v-for="status in statuses" :value="status.id" :key="status.status">{{status.status}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="text" name="tags" v-model="tags" class="form-control form-control-lg" placeholder="Tags"/>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-info btn-block btn-lg" placeholder="Tags">{{formName}}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'PostForm',
    data: function(){
        return {
            title: '',
            content: '',
            tags: '',
            statuses: [],
            currentStatus: 'Status'
        }
    },
    props: {
        formName: {
            type: String
        }
    },
    created: function(){
        this.getPostStatuses();
    },
    methods: {
        closeWindow () {
            this.$emit('formClosed', false)
        },
        formSubmit(e){
            e.preventDefault();
            let self = this;
            axios.post('http://localhost:81/blog/api/posts/create.php', {
                title: this.title,
                content: this.content,
                tags: this.tags,
                status: this.currentStatus
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
        getPostStatuses(){
            axios.get('http://localhost:81/blog/api/postStatuses/readAll.php')
            .then(response => (this.statuses = response.data.data))
            .catch(function (error) {
                alert(error);
            });
        }
    }
}
</script>