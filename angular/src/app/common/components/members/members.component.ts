import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
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
  memberIconUrl = environment.memberIconUrl;

  constructor(public matIconRegistry: MatIconRegistry) { }

  ngOnInit(): void {

  }

}