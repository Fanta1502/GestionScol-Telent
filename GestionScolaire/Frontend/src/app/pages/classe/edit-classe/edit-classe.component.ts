import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClasseService } from 'src/app/services/classe/classe.service';

@Component({
  selector: 'app-edit-classe',
  templateUrl: './edit-classe.component.html',
  styleUrls: ['./edit-classe.component.scss']
})
export class EditClasseComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  data;
  constructor(private modalService: NgbModal,private classeService : ClasseService) {}
  
  ngOnInit() {
    this.data = this.classeService.getData();
    this.editForm = new FormGroup({
      nom_classe: new FormControl(this.data.nom_classe, Validators.required),
      niveau_classe: new FormControl(this.data.niveau_classe, Validators.required),
      sequence_classe: new FormControl(this.data.sequence_classe, Validators.required),
      nombre_places: new FormControl(this.data.nombre_places, Validators.required),
      capacite_max_classe: new FormControl(this.data.capacite_max_classe, Validators.required)
    });  
  }
  get f() {
    return this.editForm.controls;
  }
  onSubmit(form: FormGroup) { 
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    let classe = {
      id : this.data.id,
      nom_classe: form.value.nom_classe,
      niveau_classe: form.value.niveau_classe,
      sequence_classe: form.value.sequence_classe,
      nombre_places: form.value.nombre_places,
      capacite_max_classe: form.value.capacite_max_classe
    }
    this.classeService.edit(classe).subscribe(
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