import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaireService {
  private URL_API = ENVIRONMENT.API + "/salaire";
  private editData;
  private type;
  constructor(private httpClient: HttpClient) { }
  setType(type)
  {
    this.type = type;
  }
  getType()
  {
    return this.type;
  }
  data(data) {
    this.editData = data;
  }
  getData() {
    return this.editData;
  }
  allByEnseignant(request,id): Observable<any> {
    return this.httpClient.get(this.URL_API + "/enseignant/"+id+"?size=" + request.size + "&page=" + request.page);
  }
  allByEnseignantGroup(): Observable<any> {
    return this.httpClient.get(this.URL_API + "/enseignantgroup");
  }
  allByPersonnel(request,id): Observable<any> {
    return this.httpClient.get(this.URL_API + "/personnel/"+id+"?size=" + request.size + "&page=" + request.page);
  }
  allByPersonnelGroup(): Observable<any> {
    return this.httpClient.get(this.URL_API + "/personnel");
  }
  addEnseignant(data: any): Observable<any> {
    return this.httpClient.post(this.URL_API +"/enseignant", data);
  }
  addPersonnel(data: any): Observable<any> {
    return this.httpClient.post(this.URL_API +"/personnel", data);
  }
  editEnseigant(data: any): Observable<any> {
    return this.httpClient.put(this.URL_API +"/enseignant", data);
  }
  editPersonnel(data: any): Observable<any> {
    return this.httpClient.put(this.URL_API+"/personnel", data);
  }
  removeEnseigant(id): Observable<any> {
    return this.httpClient.delete(this.URL_API + "/enseigant/" + id);
  }
  removePersonnel(id): Observable<any> {
    return this.httpClient.delete(this.URL_API + "/personnel/" + id);
  }
}