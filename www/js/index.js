let app = {
    init: function(){
        // document.querySelector(".deleteCtn").addEventListener("click", app.confirmDelete);
    },

    confirmDelete: function(){
        // document.querySelector(".deleteBtn").classList.add("deleteBtnCfm");
        // document.querySelector(".deleteCtn").classList.add("deleteCtnCfm");
    }
}

if ("cordova" in window){
    document.addEventListener("deviceready", app.init);
} else{
    document.addEventListener("DOMContentLoaded", app.init);
}