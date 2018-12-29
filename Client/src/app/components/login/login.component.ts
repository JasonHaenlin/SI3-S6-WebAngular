import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION } from '../../constants/storage';
import { userModel } from '../../models/incidentsModels';
import { AlertService } from '../../services/alert.service';
import { AuthentificationService } from '../../services/authentification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  sessionUser: userModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authentificationService: AuthentificationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authentificationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/visualiser';
    this.sessionUser = JSON.parse(localStorage.getItem(SESSION));
  }

  login() {
    this.loading = true;
    this.authentificationService.login(this.sessionUser.nom, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
