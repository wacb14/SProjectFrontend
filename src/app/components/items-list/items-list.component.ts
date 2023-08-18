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
  }
  onEditItem(id: number) {
    this.router.navigate(['/item', id]);
  }
  onDeleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe((response) => {
      console.log('Item deleted: ' + response);
    });
  }
  goToItemForm() {
    this.router.navigate(['/item']);
  }
}
