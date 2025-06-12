import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INavLink } from '@shared/interfaces';

@Component({
  selector: 'app-nav',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  navLinks = input<INavLink[]>();
  tablayout = input<string>('');
  textColor = input<string>('');
}
