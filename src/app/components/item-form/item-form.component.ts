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
    if(this.id){
      this.itemTemp = this.itemService.getItem(this.id);
      this.loadForm();
    }
  }
  loadForm() {
    this.name?.setValue(this.itemTemp.name);
    this.description?.setValue(this.itemTemp.description);
    this.price?.setValue(this.itemTemp.price.toString());
  }
  onSaveItem() {
    let item = {
      id: -1,
      name: this.name?.value,
      description: this.description?.value,
      price: this.price?.value,
    };
    if (this.id) {
      this.itemService.updateItem(item); // Edit case
    } else {
      this.itemService.postItem(item); // New case
    }
    this.goItemList();
  }
  goItemList() {
    this.router.navigate(['/']);
  }
}
