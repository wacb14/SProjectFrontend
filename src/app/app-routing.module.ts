import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';

const routes: Routes = [
  {path: '', component: ItemsListComponent},
  {path: 'item', component: ItemFormComponent},
  {path: 'item/:id', component: ItemFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
