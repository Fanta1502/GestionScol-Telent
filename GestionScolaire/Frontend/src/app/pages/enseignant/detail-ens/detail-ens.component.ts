import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnseignantService } from 'src/app/services/enseignant/enseignant.service';

@Component({
  selector: 'app-detail-ens',
  templateUrl: './detail-ens.component.html',
  styleUrls: ['./detail-ens.component.scss']
})
export class DetailEnsComponent implements OnInit {
  data;  
  constructor(private route: ActivatedRoute,private service : EnseignantService,private location: NgbModal) { 
  }

  ngOnInit(): void {
    this.data = this.service.getData();
  }
  back() {
    this.location.dismissAll();
    return false;
  }
}
