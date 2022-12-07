import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodeService {
  private URL_API = ENVIRONMENT.API + "/periode";
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
  allByAnneeScolaire(request,id): Observable<any> {
    return this.httpClient.get(this.URL_API + "/"+id+"?size=" + request.size + "&page=" + request.page);
  }
  allWhitoutPagination(): Observable<any> {
    return this.httpClient.get(this.URL_API + "/all");
  }
  add(periode: any): Observable<any> {
    return this.httpClient.post(this.URL_API, periode);
  }
  edit(periode: any): Observable<any> {
    return this.httpClient.put(this.URL_API, periode);
  }
  remove(id): Observable<any> {
    return this.httpClient.delete(this.URL_API + "/" + id);
  }
}