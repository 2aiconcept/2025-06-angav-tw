import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INavLink } from '@shared/interfaces';

@Component({
  selector: 'app-nav',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  // 1er input : NarLink[]
  @Input() navLinks: INavLink[] = [];
  // 2eme input : string (className)
  @Input() tablayout: string = '';
  // 3eme input : string text color
  @Input() textColor: string = '';
}
