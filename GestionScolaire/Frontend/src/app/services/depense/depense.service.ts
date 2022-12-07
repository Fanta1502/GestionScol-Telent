import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {
  private URL_API = ENVIRONMENT.API + "/depense";
  private editData;
  constructor(private httpClient: HttpClient) { }
  data(data) {
    this.editData = data;
  }
  getData() {
    return this.editData;
  }
  all(request): Observable<any> {
    return this.httpClient.get(this.URL_API + "?size=" + request.size + "&page=" + request.page);
  }
  allWithOutPagination(): Observable<any> {
    return this.httpClient.get(this.URL_API + "/allWithOutPagination");
  }
  find(libelle, date): Observable<any> {
    return this.httpClient.get(this.URL_API + "/find/" + libelle + "/" + date);
  }
  Desc(): Observable<any> {
    return this.httpClient.get(this.URL_API + "/all");
  }
  add(classe: any): Observable<any> {
    return this.httpClient.post(this.URL_API, classe);
  }
  edit(classe: any): Observable<any> {
    return this.httpClient.put(this.URL_API, classe);
  }
  remove(id): Observable<any> {
    return this.httpClient.delete(this.URL_API + "/" + id);
  }
}