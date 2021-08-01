import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoadDataApiService {

  
  constructor(private http: HttpClient) { }

  getDesigns()
  {
    return this.http.get(environment["GetDesignAPi"]+'/allImages')
  }
  login(body:any)
  {
    return this.http.post(environment["loginAdmin"] + '/login' ,body)
  }
  uploadData(body:any)
  {
    return this.http.post(environment["UploadImage"]+'/addNewImage',body)
  }
  deleteProduct(body:any)
  {
    return this.http.post(environment["DeleteProduct"]+'/deleteImage',body)
  }
}
