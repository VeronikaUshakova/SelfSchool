import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss']
})
export class AnswerDetailComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
  }

}
