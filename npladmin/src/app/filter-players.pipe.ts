import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPlayers',
})
export class FilterPlayersPipe implements PipeTransform {

  transform(players: any[], searchText: string): any[] {

    if (!players) return [];
    if (!searchText) return players;

    searchText = searchText.toLowerCase();

    return players.filter(p =>
      (p.name?.toLowerCase().includes(searchText)) ||
      (p.type_of_player?.toLowerCase().includes(searchText)) ||
      (p.base_price?.toString().includes(searchText)) ||
      (p.age?.toString().includes(searchText))
    );
  }
}
