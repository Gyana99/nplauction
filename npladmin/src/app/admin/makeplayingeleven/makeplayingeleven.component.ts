import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { environment } from 'src/environments/environment';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-makeplayingeleven',
  templateUrl: './makeplayingeleven.component.html',
  styleUrls: ['./makeplayingeleven.component.scss'],
})
export class MakeplayingelevenComponent implements OnInit {

  players: any[] = [];
  selectedPlayers: any[] = [];

  url = environment.apiUrl + 'storage/uploads/playerimage/';

  id = this.en.decrypt(localStorage.getItem('id'));
  roll = this.en.decrypt(localStorage.getItem('roll'));

  constructor(
    private cm: CommonService,
    private en: EncryptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.roll === '1' || this.roll === '0') {
      this.router.navigate(['dashboard']);
      return;
    }
    this.getPlayers();
  }

  /* FETCH PLAYERS */
  getPlayers() {
    const param = { adminid: this.id };

    this.cm.mypointandhistry(param).subscribe((res: any) => {
      if (res.status) {
        this.players = res.total_players.map((p: any) => ({
          ...p,
          selected: false,
          order: null
        }));
      }
    });
  }

  /* SELECT / DESELECT PLAYER */
  toggleSelect(player: any) {
    if (player.selected) {
      player.selected = false;
      this.selectedPlayers = this.selectedPlayers.filter(p => p.id !== player.id);
    } else {
      if (this.selectedPlayers.length >= 15) {
        alert('You can select maximum 15 players');
        return;
      }
      player.selected = true;
      this.selectedPlayers.push(player);
    }
    this.recalculateOrder();
  }

  /* REORDER AFTER EVERY CHANGE */
  recalculateOrder() {
    this.selectedPlayers.forEach((p, index) => {
      p.order = index + 1;
    });
  }

  /* MOVE PLAYER UP */
  moveUp(player: any) {
    const index = this.selectedPlayers.findIndex(p => p.id === player.id);
    if (index > 0) {
      [this.selectedPlayers[index - 1], this.selectedPlayers[index]] =
        [this.selectedPlayers[index], this.selectedPlayers[index - 1]];
      this.recalculateOrder();
    }
  }

  /* MOVE PLAYER DOWN */
  moveDown(player: any) {
    const index = this.selectedPlayers.findIndex(p => p.id === player.id);
    if (index < this.selectedPlayers.length - 1) {
      [this.selectedPlayers[index + 1], this.selectedPlayers[index]] =
        [this.selectedPlayers[index], this.selectedPlayers[index + 1]];
      this.recalculateOrder();
    }
  }

  isFirst(player: any): boolean {
    return this.selectedPlayers[0]?.id === player.id;
  }

  isLast(player: any): boolean {
    return this.selectedPlayers[this.selectedPlayers.length - 1]?.id === player.id;
  }

  /* DOWNLOAD PDF */
  downloadPDF() {
    // if (this.selectedPlayers.length < 11 || this.selectedPlayers.length > 15) {
    //   alert('Please select minimum 11 and maximum 15 players');
    //   return;
    // }

    const doc = new jsPDF('p', 'mm', 'a4');

    doc.setFontSize(16);
    doc.text('Playing XI List', 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [['#', 'Player Name', 'Role']],
      body: this.selectedPlayers
        .sort((a, b) => a.order - b.order)
        .map(p => [
          p.order,
          p.name,
          p.type_of_player
        ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [37, 99, 235] }
    });

    doc.save('Playing_XI.pdf');
  }
}
