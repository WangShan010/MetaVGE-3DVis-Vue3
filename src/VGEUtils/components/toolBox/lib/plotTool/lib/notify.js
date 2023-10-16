function notify({message, status}) {
    window.App.$message({
        message: message,
        type: status
    });
}

export default notify;
