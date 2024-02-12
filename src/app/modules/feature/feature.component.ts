import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [HeaderComponent, HomeComponent, CommonModule, RouterOutlet],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {

}
