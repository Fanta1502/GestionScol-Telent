import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnneescolaireService {
  private URL_API = ENVIRONMENT.API + "/annee_scolaire";
  private editData;
  constructor(private httpClient: HttpClient) { }
  currentData(data)
  {
    this.editData = data;
  }
  getCurrentData()
  {
    return this.editData;
  }
  data(data) {
    this.editData = data;
  }
  getData() {
    return this.editData;
  }
  all(request): Observable<any> {
    return this.httpClient.get(this.URL_API + "?size=" + request.size + "&page=" + request.page);
  }
  allWhitoutPagination(): Observable<any> {
    return this.httpClient.get(this.URL_API + "/all");
  }
  add(annee_scolaire: any): Observable<any> {
    return this.httpClient.post(this.URL_API, annee_scolaire);
  }
  edit(annee_scolaire: any): Observable<any> {
    return this.httpClient.put(this.URL_API, annee_scolaire);
  }
  remove(id): Observable<any> {
    return this.httpClient.delete(this.URL_API + "/" + id);
  }
}