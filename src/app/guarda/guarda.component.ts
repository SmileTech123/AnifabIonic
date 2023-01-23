import { Component, ElementRef, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { ServiceAnifab } from '../services';
declare var $: any;
@Component({
  selector: 'app-guarda',
  templateUrl: './guarda.component.html',
  styleUrls: ['./guarda.component.scss'],
})
export class GuardaComponent implements OnInit {
  username: string = '';
  fullusername: string = '';
  list: any[] = [];
  videoSrc: string = '';
  videoWidth: string = '';
  _storage: Storage | null = null;
  constructor(
    private storage: Storage,
    public router: Router,
    public route: ActivatedRoute,
    private ServiceAnifab: ServiceAnifab,
    private elRef: ElementRef
  ) {}

  async ngOnInit() {
    this.initStorage();
    this.fullusername = await this.storage.get('user');
    this.username = this.fullusername.split('@')[0];
    this.route.queryParams.subscribe((param: any) => {
      this.ServiceAnifab.GetLink(param.link).subscribe((r: any) => {
        var actualLink = '';
        var tokenid = $(r).find('#player')[0].dataset.id;
        var info = $(r).find('.widget.info')[0];
        var imgInfo = $(info).find('img')[0];
        imgInfo = $(imgInfo).attr('src');
        var descrizione = $(info).find('.desc').text();
        var column_episode = $(info).find('.meta')[1];
        var totalEpisode = $(column_episode).find('dd')[2].innerHTML;
        var titleInfo =
          $(info).find('.c1 .title').text().toUpperCase() +
          ' (' +
          totalEpisode +
          ' EP)';
        this.ServiceAnifab.GetVideoLink(tokenid).subscribe((r: any) => {
          var wid = $(document).width();
          if (wid > 500) {
            wid = wid / 2;
          } else {
            wid = wid - 20;
          }
          this.videoSrc = r.grabber;
          this.videoWidth = wid;
          const player = this.elRef.nativeElement.querySelector('video');
          player.load();
          var rangeid = 0;
          var server = $(r).find('.server[data-name=9]')[0];
          console.log(server, rangeid);
          var episodes = $(server).find(
            '.episodes.range[data-range-id=' + rangeid + ']'
          )[0];
          console.log(episodes);
          episodes = $(episodes).find('.episode');

          var rangeepisodi = $(r).find('.range')[0];
          var rangeepisodilen = $(rangeepisodi).children().length;

          var titolo2 = 'ciao' + ' - Episodio ' + '1';
        });
      });
    });
  }

  async initStorage() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);

    const storage = await this.storage.create();
    this._storage = storage;
  }

  handleRefresh(event: any) {
    this.router.navigate(['/guarda']);
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  disconnect() {
    this.router.navigate(['/disconnect']);
  }
}
