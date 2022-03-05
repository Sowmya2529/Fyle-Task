import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
 errmsg="";
  constructor(private apiservice:ApiService,public dialogRef: MatDialogRef<ModalComponent>) {
    this.errmsg=apiservice.errmsg;
   }

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }

}
