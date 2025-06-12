import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ui-layout',
  imports: [RouterOutlet],
  templateUrl: './ui-layout.component.html',
  styleUrl: './ui-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLayoutComponent {}
