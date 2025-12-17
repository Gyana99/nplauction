import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPlayerModalComponent } from './edit-player-modal/edit-player-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerBidCardComponent } from './player-bid-card/player-bid-card.component';



@NgModule({
  declarations: [
    EditPlayerModalComponent,
    PlayerBidCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule

  ],
  exports: [
    EditPlayerModalComponent,
    PlayerBidCardComponent
  ]
})
export class SharedModule { }
