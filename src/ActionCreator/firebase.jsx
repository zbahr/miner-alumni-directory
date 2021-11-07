import React from 'react';
import firebase from 'firebase'
// added the following import to run without errors
import 'firebase/firestore'
import Alumni from '../Models/Alumni'
import Dispatcher from '../Dispatcher/Dispatcher.jsx'
import AlumniStore from '../store/AlumniStore.jsx'
import GetAlumniSuccessfulAction from '../Actions/GetAlumniSuccessfulAction.jsx'
// export default fire;
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyAwL0n1kV-4Jtn-ooe29Aka2H-Iox1RMfc",
    authDomain: "alumni-website-b89e8.firebaseapp.com",
    databaseURL: "https://alumni-website-b89e8.firebaseio.com",
    projectId: "alumni-website-b89e8",
    storageBucket: "alumni-website-b89e8.appspot.com",
    messagingSenderId: "895239648505"
};
var fire = firebase.initializeApp(config);
var db = firebase.firestore();
var dispatcher = new Dispatcher();


export default class ActionCreator {
    alumniCollection = db.collection("Alumni");

    componentDidMount () {
        const script = document.createElement("script");

        script.src = "https://www.gstatic.com/firebasejs/5.4.1/firebase.js";
        script.async = true;

        document.body.appendChild(script);

        script.src = "https://www.gstatic.com/firebasejs/5.4.1/firebase-firestore.js";
        document.body.appendChild(script);
    }

    constructor(as) {
        dispatcher.register(as);
    }

    async approvePerson(person){
        db.collection("Alumni").doc(person.id).set({
            name: person.name,
            last_name: person.last_name,
            email: person.email,
            state: person.state,
            major: person.major,
            work_city: person.work_city,
            work_title: person.work_title,
            work_zipcode: person.work_zipcode,
            approved: "yes",
            featured: person.featured,
            business_name: person.business_name,
            grad_date: person.grad_date,
            previous_work: person.previous_work,
            previous_title: person.previous_title,
            picture_url: person.pic_url,
            linkedInURL: person.linkedInURL
        })
        setTimeout(function(){
            document.location.reload();
        }, 1000);
    }

    async makeFeatured(person){
        db.collection("Alumni").doc(person.id).set({
            name: person.name,
            email: person.email,
            last_name: person.last_name,
            state: person.state,
            major: person.major,
            work_city: person.work_city,
            work_title: person.work_title,
            work_zipcode: person.work_zipcode,
            approved: person.approved,
            featured: "yes",
            business_name: person.business_name,
            grad_date: person.grad_date,
            previous_work: person.previous_work,
            previous_title: person.previous_title,
            picture_url: person.pic_url,
            linkedInURL: person.linkedInURL
        })
        setTimeout(function(){
            document.location.reload();
        }, 1000);
    }

    async removeFeatured(person){
        db.collection("Alumni").doc(person.id).set({
            name: person.name,
            email: person.email,
            last_name: person.last_name,
            state: person.state,
            major: person.major,
            work_city: person.work_city,
            work_title: person.work_title,
            work_zipcode: person.work_zipcode,
            approved: person.approved,
            featured: "no",
            business_name: person.business_name,
            grad_date: person.grad_date,
            previous_work: person.previous_work,
            previous_title: person.previous_title,
            picture_url: person.pic_url,
            linkedin: person.linkedInURL
        })
    }

    async rejectPerson(person){
        db.collection("Alumni").doc(person.id).delete();
    }

    async getAlumni(){
        var allAlumni = [];
        await this.alumniCollection.get().then(function(snapshot) {
            snapshot.forEach(function(doc) {
                var tmp = new Alumni();
                tmp.email = document.createTextNode(doc.data().email);
                tmp.name = document.createTextNode(doc.data().name);
                tmp.featured = document.createTextNode(doc.data().featured);
                tmp.last_name = document.createTextNode(doc.data().last_name);
                tmp.id = document.createTextNode(doc.id);
                tmp.state = document.createTextNode(doc.data().state);
                tmp.work_city = document.createTextNode(doc.data().work_city);
                tmp.work_title = document.createTextNode(doc.data().work_title);
                tmp.business_name = document.createTextNode(doc.data().business_name);
                tmp.major = document.createTextNode(doc.data().major);
                tmp.work_zipcode = document.createTextNode(doc.data().work_zipcode);
                tmp.grad_date = document.createTextNode(doc.data().grad_date);
                tmp.major = document.createTextNode(doc.data().major);
                tmp.pic_url = document.createTextNode(doc.data().picture_url);
                tmp.previous_work = document.createTextNode(doc.data().previous_work);
                tmp.previous_title = document.createTextNode(doc.data().previous_title);
                tmp.linkedInURL = document.createTextNode(doc.data().linkedInURL);
                tmp.approved = document.createTextNode(doc.data().approved);
                allAlumni.push(tmp);
            });
        }).then(function(something) {
            var action = new GetAlumniSuccessfulAction(allAlumni);
            dispatcher.dispatch(action);
            return allAlumni;
        });
    }

    //Insert new alumni profile into the db. They are unapproved by default
    async inputProfile(alum, file){
        var alumniNameToSubmit = alum.name;
        var alumniLastNameToSubmit = alum.last_name;
        var alumniStateToSubmit = alum.state;
        var alumniBusinessToSubmit = alum.business_name;
        var alumniCityToSubmit = alum.city;
        var alumniWorkZipToSubmit = alum.zipcode;
        var alumniEmailToSubmit = alum.email;
        var alumniWorkMajorToSubmit = alum.major;
        var alumniGradYearToSubmit = alum.gradYear;
        var alumniTitleToSubmit = alum.work_title;
        var alumniPrevWorkToSubmit = alum.prev_work;
        var alumniPrevTitleToSubmit = alum.prev_title;
        var alumniLinkedInToSubmit = alum.linkedIn;
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "_"
                    + (currentdate.getMonth()+1)  + "_" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + "_"  
                    + currentdate.getMinutes() + "_" 
                    + currentdate.getSeconds();				
       console.log(file);

       var fileName = file.name;
	
       //Original name based on user upload time.
       var newName = datetime + fileName;
       
       //Create storage ref
       var storageRef = firebase.storage().ref('userProfilePics/' + newName);
       
       //Link to google cloud storage image location
       var alumniPicture = "gs://alumni-website-b89e8.appspot.com/userProfilePics/" + newName;
       console.log(alumniPicture);
       //Upload file
       var task = storageRef.put(file);

       // <!-- This will overwrite an existing document if one is provided -->
        db.collection("Alumni").doc().set({
            name: alumniNameToSubmit,
     //       last_name: "",
            last_name: alumniLastNameToSubmit,
            state: alumniStateToSubmit,
            major: alumniWorkMajorToSubmit,
            work_city: alumniCityToSubmit,
            work_zipcode: alumniWorkZipToSubmit,
            work_title: alumniTitleToSubmit,
            previous_work: alumniPrevWorkToSubmit,
            previous_title: alumniPrevTitleToSubmit,
            picture_uri: alumniPicture,
            approved: "no",
            business_name: alumniBusinessToSubmit,
            grad_date: alumniGradYearToSubmit,
            email: alumniEmailToSubmit,
            picture_url: "",
            featured: "no",
            linkedInURL: alumniLinkedInToSubmit
    })
    .then(function() {

        alert("PLEASE WAIT WHILE YOUR PROFILE IS BEING SUBMITTED.");
        console.log("Document successfully written!");
       
        const snapshot = db.collection("Alumni").where("picture_url", "==", "").get();
        snapshot.then(function(querySnapShot){
            querySnapShot.forEach(function(doc){
                var currentId = doc.id;
                var pic_url = firebase.storage().refFromURL(doc.data().picture_uri).getDownloadURL().then(result => {
                        console.log(result);
                        db.collection("Alumni").doc(currentId).update({
                            picture_url: result
                      });
                });
            });
        });
      
        setTimeout(function(){  
            alert('Your Profile has been Submitted. Awaiting Administrative Approval. Redirecting to the Home Page');
            document.location.href="/"
        }, 5000);
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    }
}