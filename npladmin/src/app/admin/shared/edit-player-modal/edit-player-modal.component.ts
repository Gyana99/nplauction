import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-player-modal',
  templateUrl: './edit-player-modal.component.html',
  styleUrls: ['./edit-player-modal.component.scss']
})
export class EditPlayerModalComponent {

  @Input() player: any;
  @Input() imageUrl!: string;
  @Output() closed = new EventEmitter<boolean>();

  preview: string | null = null;
  base64Image: string | null = null;

  constructor(private service: CommonService) {}
  ngOnInit(): void {
    console.log(this.player);


  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
      this.base64Image = this.preview;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    const payload = {
      id: this.player.id,
      name: this.player.name,
      mobile_no: this.player.mobile_no,
      age: this.player.age,
      base_price: this.player.base_price,
      type_of_player: this.player.type_of_player,
      photo: this.base64Image // null if unchanged
    };

    this.service.updatePlayer(payload).subscribe({
      next: (res: any) => {
        if (res.status) {
          Swal.fire('Updated', 'Player updated successfully', 'success');
          this.closed.emit(true);
        } else {
          Swal.fire('Error', res.message || 'Update failed', 'error');
        }
      },
      error: () => Swal.fire('Error', 'Server error', 'error')
    });
  }

  close() {
    this.closed.emit(false);
  }
}
