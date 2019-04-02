$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCzula4zKqJSnSxmbvOVA5bpuOJ_6D1eeE",
        authDomain: "trainstation-b5018.firebaseapp.com",
        databaseURL: "https://trainstation-b5018.firebaseio.com",
        projectId: "trainstation-b5018",
        storageBucket: "trainstation-b5018.appspot.com",
        messagingSenderId: "234193224619"
    };
    firebase.initializeApp(config);

    //setting the variable up to access firebase more easily
    var database = firebase.database();

    //an event listener attached to the button that initiates basically
    //every part of logic involving this webpage
    $(".addBtn").click(function (event) {
        event.preventDefault();
        var newTrain = $("#train").val().trim();
        var newDest = $("#dest").val().trim();
        var newFreq = $("#freq").val().trim();
        var firstTrain = $("#firstTrain").val().trim();

        console.log(moment(firstTrain).toNow());

        //converting the input data from military time into regular(?) time, for
        // when its being pushed onto the table and viewable
        var combine = firstTrain + newFreq;
        var nextArrival = moment(combine, "HH:mm").format("hh:mm a");
        var minAway = moment().endOf(newFreq).fromNow(firstTrain);


        //----------------


        //here I have seperated where ideally the math using moment.js would take
        //the firstTrain time entered, using the frequency entered, calculate how
        //many stops the train has made, and relative to what the current time,
        //calculate how much time remains until the next arrival. I had an issue with 
        //incorporating this logic. I understand exactly what I need to do but am not
        //familiar with moment.js enough to understand how i would incorporate
        //the math. I should've asked for help but combined with the group project and
        //everything that has been going on, I thought I might be able to figure it out
        //last minute but did not.
        console.log(moment().startOf(firstTrain).fromNow());


        //-----------------


        //quick conditional to test whether or not all of the input fields
        //have been filled. This was initially an attempt to introduce a form of
        //input validation but realized it doesn't necessarily qualify
        if (newTrain == "" || newDest == "" || newFreq == "" ||
            firstTrain == "") {
            alert("Please complete all fields before adding new train schedules.")
        } else {

            //given that all fields are filled, push all declared values into
            //firebase, the two variables, next_arrival and minutes_away being calculated using the
            //current time and firstTrain variables, using moment.js. The only 
            //variables directly being pushed into firebase being Train_name
            //destination, and frequency
            database.ref().push({
                Train_Name: newTrain,
                Destination: newDest,
                Frequency: newFreq,
                Next_Arrival: nextArrival,
                Minutes_Away: minAway
            })

            //quickly emptying every input field if grabbing the values
            $("input").val("");
        }
    });

    //method acts as an event listener(?), for when a new child is created in the firebase
    //each branch from that child is grabbed and pushed into the table on the page. 
    //this works for detecting any page load, keeping the information on the screen
    //whenever the page is loaded, dynamically updating from the firebase
    database.ref().on("child_added", function (childSnapshot) {
        $("#trainDis").prepend($("<tr>")).prepend(childSnapshot.val().Train_Name);
        $("#destDis").prepend($("<tr>")).prepend(childSnapshot.val().Destination);
        $("#freqDis").prepend($("<tr>")).prepend(childSnapshot.val().Frequency);
        $("#nextDis").prepend($("<tr>")).prepend(childSnapshot.val().Next_Arrival);
        $("#minDis").prepend($("<tr>")).prepend(childSnapshot.val().Minutes_Away);
    });
});