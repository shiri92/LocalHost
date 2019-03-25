<template>
    <section class="user-inbox" v-if="user">
        <h2>MY INBOX</h2>
        <div class="request flex flex-row space-between align-center" :key="idx" v-for="(request, idx) in user.requests">
            <div class="user-info" >
                <div class="request-info">
                    <span>{{request.guest.firstName}} {{request.guest.lastName}}</span>
                    has requested to stay with you from {{request.info.startDate}} till {{request.info.endDate}}
                </div>
                <div class="request-msg">
                    {{request.info.message}}
                </div>
            </div>
            <div class="answer-btns">
                <el-button type="success">Accept</el-button>
                <el-button type="danger">Decline</el-button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters.loggedUser;
        }
    }
}
</script>

<style lang="scss" scoped>
    .user-inbox {
        padding: 20px;
        .request {
            background-color: #fff;
            height: 200px;
            width: 100%;
            border-bottom: 2px solid rgba(0, 0, 0, 0.15);
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 5px;
        }
    }
</style>

