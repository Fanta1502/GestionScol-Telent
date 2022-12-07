import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MensualiteService {
  private URL_API = ENVIRONMENT.API + "/mensualite";
  private editData;
  constructor(private httpClient:HttpClient) { }
  data(data)
  {
    this.editData = data;
  }
  getData()
  {
    return this.editData;
  }
  all(request,id):Observable<any>{
    return this.httpClient.get(this.URL_API+"/"+id+"?size="+request.size + "&page=" + request.page);
  }
  add(classe: any): Observable<any> {
    return this.httpClient.post(this.URL_API , classe);
  }
  edit(classe: any): Observable<any> {
    return this.httpClient.put(this.URL_API , classe);
  }
  remove(id):Observable<any>{
    return this.httpClient.delete(this.URL_API+"/"+id);
  }
}