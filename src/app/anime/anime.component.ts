import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';

import { ServiceAnifab } from '../services';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ngbCarouselTransitionIn } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';
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
  ModalSearch: any;
  Searchstring: any = '';
  IsSearching: Boolean = false;
  constructor(
    private storage: Storage,
    public router: Router,
    private modalService: NgbModal,
    private ServiceAnifab: ServiceAnifab
  ) {}
  _storage: Storage | null = null;
  async ngOnInit() {
    this.listLastSeen = [];
    this.listLatestAnime = [];
    this.initialStyleProgressBar = 'display:block';
    this.initStorage();
    this.fullusername = await this.storage.get('user');
    this.username = this.fullusername.split('@')[0];
    this.ServiceAnifab.OngoingAndSearch(this.Searchstring).subscribe(
      (r: any) => {
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
        if (!this.IsSearching) {
          this.ServiceAnifab.LastSeen(this.fullusername).subscribe((r: any) => {
            this.listLastSeen = r;
          });
        }

        this.initialStyleProgressBar = 'display:none';
      }
    );
  }

  BackToHome() {
    this.Searchstring = '';
    this.IsSearching = false;
    this.ngOnInit();
  }

  async initStorage() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);

    const storage = await this.storage.create();
    this._storage = storage;
  }

  ViewAnime(item: any) {
    console.log(item);
    //link=/play/nierautomata-ver11a.RHFEf/d5g7yN&episode=3&titolo=NieR:Automata%20Ver1.1a&img=https://img.animeworld.tv/locandine/RHFEf.jpg&rangeid=0
    var url =
      'link=' +
      item.animelink +
      '&episode=' +
      item.episodio +
      '&titolo=' +
      item.titolo +
      '&img=' +
      item.imglink +
      '&rangeid=' +
      item.rangeid;
    this.router.navigateByUrl('/guarda?' + url);
  }

  handleRefresh(event: any) {
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
      // Any calls to load data go here
    }, 2000);
  }

  openModalSearch(content: any) {
    this.ModalSearch = this.modalService.open(content);
  }

  SearchAnime() {
    this.ModalSearch.close();
    this.IsSearching = true;
    this.ngOnInit();
  }

  disconnect() {
    this.router.navigate(['/disconnect']);
  }
}
