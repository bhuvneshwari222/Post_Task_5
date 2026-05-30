import { Component, OnInit } from '@angular/core';
import { Ipost } from '../../models/posts';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  postArr: Ipost[] = []
  editPostObj !: Ipost;

  constructor(
    private _matDialog: MatDialog,
    private _snackbar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.postArr = [
      {
        title: "JavaScript Fundamentals",
        postID: "POST201",
        content: "Learn the basics of variables, functions, and loops in JavaScript.",
        isCompleted: true
      },
      {
        title: "MongoDB Setup",
        postID: "POST203",
        content: "How to connect and manage data using MongoDB database.",
        isCompleted: false
      },
      {
        title: "Node.js Introduction",
        postID: "POST202",
        content: "Getting started with backend development using Node.js.",
        isCompleted: true
      },
      {
        title: "Express Routing",
        postID: "POST204",
        content: "Understanding routes and middleware in Express applications.",
        isCompleted: false
      },
      {
        title: "REST API Concepts",
        postID: "POST205",
        content: "Introduction to RESTful APIs and HTTP methods.",
        isCompleted: true
      }
    ];
  }

  getNewPost(newPost: Ipost) {
    this.postArr.unshift(newPost);
  }

  getRemoveID(removeID: string) {
    let config = new MatDialogConfig();
    config.data = `Are you sure, you want to remove this post???`;
    config.width = '400px';
    config.disableClose = true;
    let dialogRef = this._matDialog.open(GetConfirmComponent, config)
    dialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            let getIndex = this.postArr.findIndex(p => p.postID === removeID);
            this.postArr.splice(getIndex, 1);
            this._snackbar.openSnackBar(`The post is removed sucessfully!!!`)
          }
        },
        error: err => {
          this._snackbar.openSnackBar(err.msg);
        }
      })
  }

  getEditPost(editPst: Ipost) {
    this.editPostObj = editPst;
  }

  getUpdatedPost(updatedPost: Ipost) {
    let getIndex = this.postArr.findIndex(p => p.postID === updatedPost.postID)
    this.postArr[getIndex] = updatedPost;
    this._snackbar.openSnackBar(`The post with id ${updatedPost.postID} is updated successfully!!!`)
  }

}
