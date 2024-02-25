import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core'

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css',
})
export class LearnComponent {}
