let app = {

    messages: [
        `What's the plan?`,
        `Anything in mind?`,
        `What's next?`,
        `What to do later?`
    ],

    init: function(){
        // document.querySelector(".deleteCtn").addEventListener("click", app.confirmDelete);\
        document.querySelector(".addBtn").addEventListener("click", app.toggleBtn);
        document.querySelector(".backBtn").addEventListener("click", app.toggleBtn);
        setInterval(() => {
            app.changeMessages();
        }, 5000);
    },

    confirmDelete: function(){
        // document.querySelector(".deleteBtn").classList.add("deleteBtnCfm");
        // document.querySelector(".deleteCtn").classList.add("deleteCtnCfm");
    },

    toggleBtn: function(){
        document.querySelector(".addBtn").classList.toggle("addBtnHide");
        document.querySelector(".backBtn").classList.toggle("backBtnShow");
        document.querySelector(".listPage").classList.toggle("hide");
        document.querySelector(".addPage").classList.toggle("hideAdd");
    },

    changeMessages: function(){
            document.querySelector(".msg").classList.remove("msgVisible");
        
        setTimeout(()=>{document.querySelector(".msg").textContent = `${app.messages[
            ((min,max)=>{
                min = Math.ceil(min);
                max = Math.floor(max + 1);
                return Math.floor(Math.random() * (max - min)) + min;})(0,3)]}`;}, 500);
                
        setTimeout(() => {document.querySelector(".msg").classList.add("msgVisible");}, 1000);
    }
}

if ("cordova" in window){
    document.addEventListener("deviceready", app.init);
} else{
    document.addEventListener("DOMContentLoaded", app.init);
}