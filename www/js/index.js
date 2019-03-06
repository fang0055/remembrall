let app = {

    messages: [
        "What's the plan?",
        "Anything in mind?",
        "What's next?",
        "What to do later?",
        "Ready to note?"
    ],

    // inTenSec: (new Date()).setSeconds((new Date().getSeconds()+10)),

    reminders: [
        // {
        //     id: 1,
        //     title: "TEST",
        //     text: "Can you get me?",
        //     at: new Date().setSeconds((new Date().getSeconds()+20)),
        //     data: {prop: "prop value"}
        // }
    ],

    init: function () {
        // document.querySelector(".deleteCtn").addEventListener("click", app.confirmDelete);\
        // cordova.plugins.notification.local.schedule(reminders[0]);
        // console.log(app.reminders[0]);
        // app.addNote();
        document.querySelector(".addBtn").addEventListener("click", app.toggleBtn);
        document.querySelector(".backBtn").addEventListener("click", app.toggleBtn);
        document.querySelector(".saveBtn").addEventListener("click", app.addReminder);
        setInterval(() => {
            app.changeMessages();
        }, 5000);
    },

    confirmDelete: function () {
        // document.querySelector(".deleteBtn").classList.add("deleteBtnCfm");
        // document.querySelector(".deleteCtn").classList.add("deleteCtnCfm");
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
            at: new Date(luxon.DateTime.fromISO(date).minus({
                days: 7
            })),
            data: dateText
        }
        console.log(reminder);
        cordova.plugins.notification.local.schedule(reminder);
        app.reminders.push(reminder);
        console.log(app.reminders);
        cordova.plugins.notification.local.getScheduled(items=>{
            console.log(items);
        });
        document.querySelector(".listPage").innerHTML = "";
        app.reminders.forEach(item => {
            let documentFragment = new DocumentFragment();
            let listCtn = document.createElement("div");
            let deleteCtn = document.createElement("div");
            let deleteBtn = document.createElement("i");
            let rmdDate = document.createElement("div");
            let rmdText = document.createElement("div");

            // rmdDate.textContent = reminder.data.date.toUpperCase();
            rmdDate.textContent = item.data.toUpperCase();
            rmdText.textContent = item.text;

            listCtn.className = "listCtn";
            deleteCtn.className = "deleteCtn";
            deleteBtn.className = "far fa-trash-alt deleteBtn";
            rmdDate.className = "rmdDate";
            rmdText.className = "rmdText";

            listCtn.appendChild(deleteCtn);
            listCtn.appendChild(rmdDate);
            listCtn.appendChild(rmdText);
            deleteCtn.appendChild(deleteBtn);
            documentFragment.appendChild(listCtn);
            document.querySelector(".listPage").appendChild(documentFragment);
        });
        // console.log(reminders);
        app.toggleBtn();
        // cordova.plugins.notification.local.getScheduled(reminders => {
        //     console.log(reminders);});
        // setTimeout(app.createListPage, 250);
    },

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