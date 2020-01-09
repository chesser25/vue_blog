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
            currentStatusId: '',
            formName: 'Edit post'
        }
    },
    props: {
        postToEdit: {
            type: Object,
            required: true
        }
    },
    created: async function() {
        await this.getPostStatuses();
        this.setData();
    },
    methods: {
        closeWindow () {
            this.$emit('formClosed', false)
        },
        formSubmit(e){
            e.preventDefault();
            let self = this;
            axios.put('/api/posts/update.php', {
                title: this.title,
                content: this.content,
                tags: this.tags,
                status: this.currentStatusId,
                id: this.postToEdit.id
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
            let self = this;
            return axios.get('/api/postStatuses/readAll.php')
            .then(function(response){
                self.statuses = response.data.data;
            })
            .catch(function (error) {
                alert(error);
            });
        },
        setData(){
            this.title = this.postToEdit.title;
            this.content = this.postToEdit.content;
            this.statuses.forEach(s => {
                if(s.status === this.postToEdit.status){
                    this.currentStatusId = s.id;
                }
            });
            this.tags = this.postToEdit.tags;
        }
    }
}
</script>