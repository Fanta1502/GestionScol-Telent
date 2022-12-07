import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EleveService } from 'src/app/services/eleve/eleve.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  currentEleve;
  constructor(private route: ActivatedRoute,private eleveService : EleveService,private location: NgbModal) { 
  }

  ngOnInit(): void {
    this.currentEleve = this.eleveService.getData();
  }
  back() {
    this.location.dismissAll();
    return false;
  }
}
