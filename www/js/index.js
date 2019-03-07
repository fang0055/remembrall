let app = {

    messages: [
        "What's the plan?",
        "Anything in mind?",
        "What's next?",
        "What to do later?",
        "Ready to note?"
    ],

    reminders: [],

    init: function () {
        cordova.plugins.notification.local.cancelAll();
        document.querySelector(".addBtn").addEventListener("click", app.toggleBtn);
        document.querySelector(".backBtn").addEventListener("click", app.toggleBtn);
        document.querySelector(".saveBtn").addEventListener("click", app.addReminder);
        setInterval(() => {
            app.changeMessages();
        }, 5000);
    },

    toggleBtn: function () {
        document.querySelector(".addBtn").classList.toggle("addBtnHide");
        document.querySelector(".backBtn").classList.toggle("backBtnShow");
        document.querySelector(".listPage").classList.toggle("hide");
        document.querySelector(".addPage").classList.toggle("hideAdd");
    },

    changeMessages: function () {
        document.querySelector(".msg").classList.remove("msgVisible");

        setTimeout(() => {
            document.querySelector(".msg").textContent = `${app.messages[
            ((min,max)=>{
                min = Math.ceil(min);
                max = Math.floor(max + 1);
                return Math.floor(Math.random() * (max - min)) + min;})(0,4)]}`;
        }, 500);

        setTimeout(() => {
            document.querySelector(".msg").classList.add("msgVisible");
        }, 800);
    },

    addReminder: function () {
        let text = document.querySelector(".inputText").value;
        let date = document.querySelector(".inputDate").value;
        let dateText = luxon.DateTime.fromISO(date).toLocaleString({
            month: 'short',
            day: '2-digit'
        });

        let reminder = {
            id: Date.now(),
            title: "Rememberall",
            text: text,
            at: new Date(luxon.DateTime.fromISO(date+"T08:00:00").minus({
                days: 7
            })),
            data: dateText,
        }
        cordova.plugins.notification.local.schedule(reminder);
        app.reminders.push(reminder);

        let i = app.reminders.length;
        if(i>1 && new Date(app.reminders[i-1].data) < new Date(app.reminders[i-2].data)){
            app.reminders.sort( (a, b)=>{
                return new Date(a.data) - new Date(b.data);
            });
        }

        document.querySelector(".listPage").innerHTML = "";
        app.reminders.forEach(item => {
            let documentFragment = new DocumentFragment();
            let listCtn = document.createElement("div");
            let deleteCtn = document.createElement("div");
            let deleteBtn = document.createElement("i");
            let rmdDate = document.createElement("div");
            let rmdText = document.createElement("div");

            rmdDate.textContent = item.data.toUpperCase();
            rmdText.textContent = item.text;

            listCtn.className = "listCtn";
            deleteCtn.className = "deleteCtn";
            deleteBtn.className = "far fa-trash-alt deleteBtn";
            rmdDate.className = "rmdDate";
            rmdText.className = "rmdText";
            deleteCtn.setAttribute("data-id", item.id);

            deleteCtn.addEventListener("click", app.deleteIcon);

            listCtn.appendChild(deleteCtn);
            listCtn.appendChild(rmdDate);
            listCtn.appendChild(rmdText);
            deleteCtn.appendChild(deleteBtn);
            documentFragment.appendChild(listCtn);
            document.querySelector(".listPage").appendChild(documentFragment);
        });
        app.toggleBtn();
    },

    deleteIcon: function(ev){
        console.log(ev.currentTarget);
        ev.currentTarget.classList.add("deleteCtnRed");
        document.querySelector(".deleteCtnRed i").classList.add("deleteBtnWhite");

        navigator.notification.confirm(
            "Are you sure to delete this reminder?", 
            app.deleteRmd,
            "Confirmation",
            ["Cancel", "Confirm"]
            );
    },

    deleteRmd: function(buttonIndex){
        if(buttonIndex == 1){
            document.querySelector(".deleteCtnRed").classList.remove("deleteCtnRed");
            document.querySelector(".deleteBtnWhite").classList.remove("deleteBtnWhite");
        } else{
            let id = document.querySelector(".deleteCtnRed").getAttribute("data-id");
            cordova.plugins.notification.local.cancel(id);
            console.log(id);
            console.log("From here!!!!!!!!!!");
            cordova.plugins.notification.local.getScheduled(items =>{
                console.log(items);
            });
            document.querySelector(".deleteCtnRed").classList.add("deleteCtnCfm");
            document.querySelector(".deleteCtnRed").parentElement.classList.add("removeItem");
            setTimeout( ()=>{
                document.querySelector(".deleteCtnRed").classList.add("deleteCtnHide");
                document.querySelector(".deleteCtnRed").parentElement.classList.add("hideItem");
            },500);
            setTimeout( ()=>{
                document.querySelector(".listPage").removeChild(document.querySelector(".removeItem"));
            },850);

            let i = app.reminders.findIndex(item => item.id == id );
            app.reminders.splice(i,1);
            console.log(app.reminders);
        }
    }

    //   createListPage: function(){
    //     cordova.plugins.notification.local.getScheduled(reminders => {
    //         console.log(reminders);
    //         document.querySelector(".listPage").innerHTML = "";
    //         reminders.forEach(reminder => {
    //             let documentFragment = new DocumentFragment();
    //             let listCtn = document.createElement("div");
    //             let deleteCtn = document.createElement("div");
    //             let deleteBtn = document.createElement("i");
    //             let rmdDate = document.createElement("div");
    //             let rmdText = document.createElement("div");

    //             rmdDate.textContent = reminder.data.date.toUpperCase();
    //             rmdText.textContent = reminder.text;

    //             listCtn.className = "listCtn";
    //             deleteCtn.className = "deleteCtn";
    //             deleteBtn.className = "far fa-trash-alt deleteBtn";
    //             rmdDate.className = "rmdDate";
    //             rmdText.className = "rmdText";

    //             listCtn.appendChild(deleteCtn);
    //             listCtn.appendChild(rmdDate);
    //             listCtn.appendChild(rmdText);
    //             deleteCtn.appendChild(deleteBtn);
    //             documentFragment.appendChild(listCtn);
    //             document.querySelector(".listPage").appendChild(documentFragment);
    //         });

    //         app.toggleBtn();

    //     });
    //   }
}

if ("cordova" in window) {
    document.addEventListener("deviceready", app.init);
} else {
    document.addEventListener("DOMContentLoaded", app.init);
}