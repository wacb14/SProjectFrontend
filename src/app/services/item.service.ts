import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  data = ['papa', 'queso'];
  constructor() {}
  // getItem(id:number):Observable<Item>{
  getItem(id: number): Item {
    let item = new Item(-1, 'v', 'v', 1);
    return item;
  }
  postItem(item:any){
    
  }
  updateItem(item:any){
    
  }
  deleteItem(id:number){

  }
}
