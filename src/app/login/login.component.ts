import { Component, OnInit } from '@angular/core';
import { ServiceAnifab } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isDisconnected: boolean = false;
  isRemember: boolean = false;
  _storage: Storage | null = null;
  constructor(
    private storage: Storage,
    private ServiceAnifab: ServiceAnifab,
    public router: Router,
    private activeroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeroute.queryParams.subscribe((param) => {
      console.log();
      if (param['disconnect'] != undefined) {
        this.isDisconnected = true;
      } else {
        this.isDisconnected = false;
      }
    });
    this.initStorage();
  }

  async initStorage() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);

    const storage = await this.storage.create();
    console.log(this.isDisconnected);
    if (this.isDisconnected) {
      await this.storage.clear();
    }

    this._storage = storage;

    if ((await this._storage?.get('user')) != undefined) {
      this.username = await this._storage?.get('user');
      this.password = await this._storage?.get('password');
      this.Login();
    }
  }

  Login() {
    this.ServiceAnifab.Authenticate(this.username, this.password).subscribe(
      (r: any) => {
        console.log(this.isRemember);
        if (r.auth) {
          if (this.isRemember) {
            this._storage?.set('user', this.username);
            this._storage?.set('password', this.password);
          }

          this.router.navigate(['/anime']);
        }
      }
    );
  }
}
