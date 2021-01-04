import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMember } from '../../interface';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  @Input() members: IMember[] | null = null;
  @Input() cssClassName = '';
  @Output() memberClick = new EventEmitter();

  memberIconUrl = environment.memberIconUrl;

  constructor() { }

  ngOnInit(): void {

  }

}