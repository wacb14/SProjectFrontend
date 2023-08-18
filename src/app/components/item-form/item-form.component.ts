import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  id = -1;
  itemTemp: Item = null!;
  itemForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    price: [''],
  });

  get name() {
    return this.itemForm.get('name');
  }
  get description() {
    return this.itemForm.get('description');
  }
  get price() {
    return this.itemForm.get('price');
  }

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.itemService.getItem(this.id).subscribe((response) => {
        this.itemTemp = response;
        this.loadForm();
      });
    }
  }
  loadForm() {
    this.name?.setValue(this.itemTemp.name);
    this.description?.setValue(this.itemTemp.description);
    this.price?.setValue(this.itemTemp.price.toString());
  }
  onSaveItem() {
    if (this.name?.value && this.description?.value && this.price?.value) {
      let item = new Item(
        0,
        this.name?.value,
        this.description?.value,
        Number.parseFloat(this.price?.value)
      );
      if (this.id) {
        item.id = this.id;
        this.itemService.updateItem(this.id, item).subscribe((response) => {
          console.log('Item updated');
        }); // Edit case
      } else {
        this.itemService.postItem(item).subscribe((response) => {
          console.log('New item saved');
        }); // New case
      }
      this.goItemList();
    }
  }
  goItemList() {
    this.router.navigate(['/']);
  }
}
