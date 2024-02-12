import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnInit {
@Input() buttonName: string =''
@Input() buttonColor: string =''

ngOnInit(): void {
  
}
}
