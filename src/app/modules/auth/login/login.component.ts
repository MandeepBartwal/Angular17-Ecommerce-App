import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public signInForm: FormGroup | any;
  public isFormValid: boolean = false;
  form: FormGroup = new FormGroup({
    username: new FormControl('kminchelle'),
    password: new FormControl('0lelplR')
  });
  constructor(
    private _sharedService: SharedService,
    public _formBuilder: FormBuilder,
    public _router: Router) {
  }

  ngOnInit() {
    this.signInForm = this._formBuilder.group({
      username: ['kminchelle', [Validators.required]],
      password: [
        '0lelplR',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ],
    });
  }

  signIn() {
    if (this.signInForm.invalid) {
      this.isFormValid = true
    }
    this._sharedService.signIn(this.signInForm.value).subscribe((res: any) => {
      this._sharedService.userId$.next(res.id);
      this._sharedService.userInfo$.next(res);
      this._router.navigateByUrl('home')

    })
  }
}
