import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NotesService } from "src/app/Services/notes.service";
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from "@angular/forms";

// Used to declare JQuery
declare var $: any;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})

export class ProfileComponent implements OnInit {

  //Global Variables
  allNotesList;
  userToken;
  decodedToken;
  isPageLoading = true;

  constructor(private _Router: Router, private _NotesService: NotesService) {
    // Check if there is a Token and if Not redirect user to sign-in
    if (!localStorage.getItem("TOKEN")) {
      this._Router.navigate(["/signin"]);
    }

    try {
      // Check If The Token is Valid
      this.userToken = localStorage.getItem("TOKEN");
      this.decodedToken = jwt_decode(this.userToken);
    }
    catch (error) {      
      localStorage.clear();
      this._Router.navigate(["/signin"]);
    }

  // Get All Notes of this User
    this.getAllUserNotes();

  }

  // Get All Notes of this User
  getAllUserNotes() {
    let userIdAndToken = {
      token: this.userToken,
      userID: this.decodedToken._id
    };

    this._NotesService.getAllNotesApiService(userIdAndToken).subscribe((res) => {
      console.log(res);
      if (res.message == "success") {
        this.isPageLoading = false;
        this.allNotesList = res.Notes;
      } else {
        localStorage.clear();
        this._Router.navigate(["/signin"]);
      }
    });
  }


  // Create a Form for adding new notes
  theNoteForm = new FormGroup({
    title: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required),
  });

  addNewNote() {
    let noteData = {
      title: this.theNoteForm.value.title,
      desc: this.theNoteForm.value.desc,
      token: this.userToken,
      citizenID: this.decodedToken._id,
    };

    this._NotesService.addNoteApiService(noteData).subscribe(
      (serverResponse) => {
      if (serverResponse.message == "success") {
        $("#addNote").modal("hide");
        this.getAllUserNotes();
        this.theNoteForm.reset();
      }
    });
    // console.log(this.AddNote.value);
  }

  // ============================ delete note =================================

  NOTE_ID;
  getNoteID(noteID) {
    this.NOTE_ID = noteID;
  }

  deleteNote() {
    let userTokenAndNoteID = {
      token: this.userToken,
      NoteID: this.NOTE_ID,
    };
    this._NotesService.deleteNoteApiService(userTokenAndNoteID).subscribe(
      (serverResponse) => {
        if (serverResponse.message == "deleted") {
          $("#deleteNote").modal("hide");
          this.getAllUserNotes();
        }
    });
  }

  // ============================= edit=========================

  // Create a Form for adding new notes
  theEditNoteForm = new FormGroup({
    title: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required),
  });

  setTheEditFormValue()
  {
    for (let noteIndex = 0; noteIndex < this.allNotesList.length; noteIndex++) {
      if(this.allNotesList[noteIndex]._id==this.NOTE_ID)
      {
        // console.log(this.AllNotes[index]);
        this.theEditNoteForm.controls.title.setValue(this.allNotesList[noteIndex].title)
        this.theEditNoteForm.controls.desc.setValue(this.allNotesList[noteIndex].desc)
        
      }
      
    }
  }
  editNote()
  {
    let tokenAndNoteData={
      title:this.theEditNoteForm.value.title,
      desc:this.theEditNoteForm.value.desc,
      NoteID:this.NOTE_ID,
      token:this.userToken
    }

    this._NotesService.updateNoteApiService(tokenAndNoteData).subscribe(
      (serverResponse)=>{
        if(serverResponse.message=='updated')
        {
          $("#editNote").modal("hide");
          this.getAllUserNotes();
        }
      
    })
  }
  ngOnInit() {}
}
