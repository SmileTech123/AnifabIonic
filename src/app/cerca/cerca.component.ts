import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';

import { ServiceAnifab } from '../services';
declare var $: any;
@Component({
  selector: 'app-cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.scss'],
})
export class CercaComponent implements OnInit {
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
