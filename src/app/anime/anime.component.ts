import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';

import { ServiceAnifab } from '../services';
declare var $: any;
@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
})
export class AnimeComponent implements OnInit {
  username: string = '';
  fullusername: string = '';
  listLastSeen: any[] = [];
  listLatestAnime: any[] = [];
  initialStyleProgressBar: any = 'display:block';
  constructor(
    private storage: Storage,
    public router: Router,

    private ServiceAnifab: ServiceAnifab
  ) {}
  _storage: Storage | null = null;
  async ngOnInit() {
    this.initialStyleProgressBar = 'display:block';
    this.initStorage();
    this.fullusername = await this.storage.get('user');
    this.username = this.fullusername.split('@')[0];
    this.ServiceAnifab.OngoingAndSearch('').subscribe((r: any) => {
      //this.listLatestAnime = r;
      var lista = $(r).find('.film-list');
      lista = $(lista).find('.item');
      if (lista.length == 0) {
        $('.center').append('<h3>Nessun risultato</h3>');
      } else {
        for (let i = 0; i < lista.length; i++) {
          const itm = lista[i];
          var href = $(itm).find('.inner').find('a.poster').attr('href');
          var img = $(itm)
            .find('.inner')
            .find('a.poster')
            .find('img')
            .attr('src');
          // var title = $(itm).find(".inner").find("a.name").text();
          var fulltitle = $(itm).find('.inner').find('a.name').text();
          var obj = { animelink: href, titolo: fulltitle, imglink: img };
          this.listLatestAnime.push(obj);
        }
      }
      this.ServiceAnifab.LastSeen(this.fullusername).subscribe((r: any) => {
        this.listLastSeen = r;
      });
      this.initialStyleProgressBar = 'display:none';
    });
  }

  async initStorage() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);

    const storage = await this.storage.create();
    this._storage = storage;
  }

  ViewAnime(url: string) {
    this.router.navigateByUrl('/guarda?link=' + url);
  }

  handleRefresh(event: any) {
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
      // Any calls to load data go here
    }, 2000);
  }

  disconnect() {
    this.router.navigate(['/disconnect']);
  }
}
