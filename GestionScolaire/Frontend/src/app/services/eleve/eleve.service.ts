import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private URL_API = ENVIRONMENT.API + "/eleve";
  private editData;
  private type;
  constructor(private httpClient:HttpClient) { }
  setType(ty)
  {
    this.type = ty;
  }
  getType()
  {
    return this.type
  }
  data(data)
  {
    this.editData = data;
  }
  getData()
  {
    return this.editData;
  }
  all(request):Observable<any>{
    return this.httpClient.get(this.URL_API+"?size="+request.size + "&page=" + request.page);
  }
  count():Observable<any>{
    return this.httpClient.get(this.URL_API+"/count");
  }
  allByClasse(request,classeId):Observable<any>{
    return this.httpClient.get(this.URL_API+ "/all_by_classe/" + classeId+"?size="+request.size + "&page=" + request.page);
  }
  allByClasseWithOutPagination(classeId):Observable<any>{
    return this.httpClient.get(this.URL_API+ "/all_by_classe_1/" + classeId);
  }
  allWhitoutPagination():Observable<any>{
    return this.httpClient.get(this.URL_API+"/all");
  }
  add(eleve: any): Observable<any> {
    return this.httpClient.post(this.URL_API , eleve);
  }
  edit(eleve: any): Observable<any> {
    return this.httpClient.put(this.URL_API , eleve);
  }
  remove(id):Observable<any>{
    return this.httpClient.delete(this.URL_API+"/"+id);
  }
}
