import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}
  getItems(): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(environment.apiURL + '/Item/GetItems');
  }
  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(environment.apiURL + '/Item/GetItemById?id=' + id);
  }
  postItem( item: Item):Observable<Item> {
    return this.http.post<Item>(environment.apiURL + '/Item/PostItem',item);
  }
  updateItem(id:number,item: Item):Observable<Item> {
    return this.http.put<Item>(environment.apiURL + '/Item/PutItem?id=' + id,item);
  }
  deleteItem(id: number):Observable<number> {
  return this.http.delete<number>(environment.apiURL+ '/Item/DeleteItem?id='+id);
  }
}
