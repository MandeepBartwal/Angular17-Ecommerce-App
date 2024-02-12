import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  public isLoggedIn: boolean = false
  constructor(private _sharedService: SharedService, public _router: Router
  ) {

  }
  ngOnInit(): void {
      this.isLoggedIn = this._sharedService._authenticated;      
  }

  public logout(){
    localStorage.clear();
    this._router.navigateByUrl('/login')
  }
}
