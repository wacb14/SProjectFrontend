import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent {
  items:Array<Item> = [new Item(1,'a','a',321), new Item(2,'b','b',66)];
  constructor(private itemService: ItemService, private router: Router) {}
  onEditItem(id:number){
    this.router.navigate(['/item',id]);
  }
  onDeleteItem(id:number){
    this.itemService.deleteItem(id);
  }
  goToItemForm(){
    this.router.navigate(['/item']);
  }
}
