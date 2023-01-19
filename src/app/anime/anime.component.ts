import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { ServiceAnifab } from '../services';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);
@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
})
export class AnimeComponent implements OnInit {
  username: string = '';
  fullusername: string = '';
  list: any[] = [];
  constructor(
    private storage: Storage,
    public router: Router,
    private ServiceAnifab: ServiceAnifab
  ) {}
  _storage: Storage | null = null;
  async ngOnInit() {
    this.initStorage();
    this.fullusername = await this.storage.get('user');
    this.username = this.fullusername.split('@')[0];
    console.log(this.username);
    this.ServiceAnifab.LastSeen(this.fullusername).subscribe((r: any) => {
      this.list = r;
    });
  }

  async initStorage() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);

    const storage = await this.storage.create();
    this._storage = storage;
  }

  ViewAnime(url: string) {}

  handleRefresh(event: any) {
    this.router.navigate(['/anime']);
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  disconnect() {
    this.router.navigate(['/disconnect']);
  }
}
