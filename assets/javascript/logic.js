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

    var database = firebase.database();

    var randomDate = "03/02/1997";
    var randomFormat = "DD/MM/YYYY";
    var convertedDate = moment(randomDate, randomFormat);

    console.log(convertedDate.format("MM/DD/YY"));


    //var newTrain = $("#train").val().trim();

    $(".addBtn").click(function (event) {
        event.preventDefault();
        var newTrain = $("#train").val().trim();
        var newDest = $("#dest").val().trim();
        var newFreq = $("#freq").val().trim();
        var firstTrain = $("#firstTrain").val().trim();

        console.log(moment(firstTrain, "HH:mm").format("hh:mm a"));

        var combine = firstTrain + newFreq;
        var nextArrival = moment(combine, "HH:mm").format("hh:mm a");
        var minAway = moment().endOf(newFreq).fromNow(firstTrain);

        if (newTrain == "" || newDest == "" || newFreq == "" ||
            firstTrain == "") {

                alert("Please complete all fields before adding new train schedules.")

        } else {

            //var minAway = $("#minAway").val().trim();

            database.ref().push({
                Train_Name: newTrain,
                Destination: newDest,
                Frequency: newFreq,
                Next_Arrival: nextArrival,
                Minutes_Away: minAway
            })

            $("input").val("");

        }
    });

    database.ref().on("child_added", function (childSnapshot) {

        $("#trainDis").prepend($("<tr>")).prepend(childSnapshot.val().Train_Name);
        $("#destDis").prepend($("<tr>")).prepend(childSnapshot.val().Destination);
        $("#freqDis").prepend($("<tr>")).prepend(childSnapshot.val().Frequency);
        $("#nextDis").prepend($("<tr>")).prepend(childSnapshot.val().Next_Arrival);
        $("#minDis").prepend($("<tr>")).prepend(childSnapshot.val().Minutes_Away);


    })

})