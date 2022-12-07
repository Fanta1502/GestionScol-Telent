import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';

@Component({
  selector: 'app-detail-per',
  templateUrl: './detail-per.component.html',
  styleUrls: ['./detail-per.component.scss']
})
export class DetailPerComponent implements OnInit {
  data;  
  constructor(private service : PersonnelService,private location: NgbModal) { 
  }

  ngOnInit(): void {
    this.data = this.service.getData();
  }
  back() {
    this.location.dismissAll();
    return false;
  }
}
