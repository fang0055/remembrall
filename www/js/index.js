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
        // cordova.plugins.notification.local.clearAll();
        cordova.plugins.notification.local.cancelAll();
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
            data: dateText,
            // date: dateCompare
        }
        // console.log(reminder);
        cordova.plugins.notification.local.schedule(reminder);
        app.reminders.push(reminder);
        console.log(app.reminders);

        // let dateCompare = luxon.DateTime.fromISO(dateText);
        // console.log(dateCompare);

        let i = app.reminders.length;
        console.log(i);
        console.log(new Date(app.reminders[i-1].data));
        // console.log(app.reminders[i-1].at);

        if(new Date(app.reminders[i-1].data) < new Date(app.reminders[i-2].data)){
            console.log("Helllllllo!!!");
            app.reminders.sort( (a, b)=>{
                return new Date(a.data) - new Date(b.data)
            });
            console.log(app.reminders);
        }

        cordova.plugins.notification.local.getScheduled(items=>{
            items
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

            rmdDate.textContent = item.data.toUpperCase();
            rmdText.textContent = item.text;

            listCtn.className = "listCtn";
            deleteCtn.className = "deleteCtn";
            deleteBtn.className = "far fa-trash-alt deleteBtn";
            rmdDate.className = "rmdDate";
            rmdText.className = "rmdText";

            deleteCtn.addEventListener("click", app.deleteIcon);

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
            document.querySelector(".deleteCtnRed").classList.add("deleteCtnCfm");
            document.querySelector(".deleteCtnRed").parentElement.classList.add("removeItem");
            setTimeout( ()=>{
                document.querySelector(".deleteCtnRed").classList.add("deleteCtnHide");
                document.querySelector(".deleteCtnRed").parentElement.classList.add("hideItem");
            },500);
            setTimeout( ()=>{
                document.querySelector(".listPage").removeChild(document.querySelector(".removeItem"));
            },850);
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