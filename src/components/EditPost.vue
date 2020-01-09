<template src="../templates/postForm.html" />
<script>
import axios from 'axios'

export default {
    name: 'EditPost',
    data: function(){
        return {
            title: '',
            content: '',
            tags: '',
            statuses: [],
            currentStatus: 'Status',
            formName: 'Edit post'
        }
    },
    props: {
        postToEdit: {
            type: Object,
            required: true
        }
    },
    mounted: function(){
        this.setData();
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
        },
        setData(){
            this.title = this.postToEdit.title;
            this.content = this.postToEdit.content;
            this.currentStatus = this.postToEdit.status;
            this.tags = this.postToEdit.tags;
        }
    }
}
</script>