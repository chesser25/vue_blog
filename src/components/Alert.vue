<template>
    <div :class="['alert', status, 'alert-dismissible fade show']" role="alert">
        <strong>{{message}}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        status: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
}
</script>