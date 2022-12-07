import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepenseService } from 'src/app/services/depense/depense.service';

@Component({
  selector: 'app-detail-dep',
  templateUrl: './detail-dep.component.html',
  styleUrls: ['./detail-dep.component.scss']
})
export class DetailDepComponent implements OnInit {
  data;  
  constructor(private service : DepenseService,private location: NgbModal) { 
  }
  ngOnInit(): void {
    this.data = this.service.getData();
  }
  back() {
    this.location.dismissAll();
    return false;
  }
}
