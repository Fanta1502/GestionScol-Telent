import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClasseService } from 'src/app/services/classe/classe.service';

@Component({
  selector: 'app-add-classe',
  templateUrl: './add-classe.component.html',
  styleUrls: ['./add-classe.component.scss']
})
export class AddClasseComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  dateSup = false;
  constructor(private modalService: NgbModal,private classeService : ClasseService) {}
  
  ngOnInit() {
    this.addForm = new FormGroup({
      nom_classe: new FormControl('', Validators.required),
      niveau_classe: new FormControl('', Validators.required),
      sequence_classe: new FormControl('', Validators.required),
      nombre_places: new FormControl('', Validators.required),
      capacite_max_classe: new FormControl('', Validators.required)
    });  
  }
  get f() {
    return this.addForm.controls;
  }
  onSubmit(form: FormGroup) { 
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    let classe = {
      nom_classe: form.value.nom_classe,
      niveau_classe: form.value.niveau_classe,
      sequence_classe: form.value.sequence_classe,
      nombre_places: form.value.nombre_places,
      capacite_max_classe: form.value.capacite_max_classe
    }
    this.classeService.add(classe).subscribe(
      res => {
        this.modalService.dismissAll();
      }
    )
  }
  close()
  {
    this.modalService.dismissAll();
  }
}
