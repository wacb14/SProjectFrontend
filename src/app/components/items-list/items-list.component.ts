import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  items: Array<Item> = [];
  constructor(private itemService: ItemService, private router: Router) {}
  ngOnInit(): void {
    this.itemService.getItems().subscribe((response) => {
      this.items = response;
    });
    this.updateLocalData();
  }
  updateLocalData() {
    this.itemService.msgItem.subscribe((response) => {
      let id: number = response;
      let indexItem = this.items.findIndex((item) => item.id == id);
      let itemUpdate;
      this.itemService.getItem(id).subscribe((response2) => {
        itemUpdate = response2;
        if (indexItem != -1) {
          // Edit case
          this.items[indexItem] = itemUpdate;
        } else {
          // New case
          this.items.push(itemUpdate);
        }
      });
    });
  }
  onEditItem(id: number) {
    this.router.navigate(['/item', id]);
  }
  onDeleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe((response) => {
      console.log('Item deleted: ' + response);
      let index = this.items.findIndex((item) => item.id == id);
      this.items.splice(index,1);
    });
  }
  goToItemForm() {
    this.router.navigate(['/item']);
  }
}
