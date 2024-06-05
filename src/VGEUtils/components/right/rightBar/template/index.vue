<template>
    <div class="rightBar">
        <slot></slot>
    </div>
</template>


<script>
export default {
    name: 'rightBar',
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style lang="less" scoped>

.rightBar {
    position: fixed;
    top: 17vh;
    right: 0;
    width: 300px;
    min-height: 30vh;
    max-height: 80vh;
    //padding: 2px;
    border-radius: 10px 0 0 10px;
    border: rgba(238, 190, 119, 0.29) solid 1px;
    border-right: 0;
    background: rgba(33, 45, 33, 0.8);
    color: white;
}

</style>
