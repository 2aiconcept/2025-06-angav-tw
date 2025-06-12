import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-test-onpush',
  imports: [],
  templateUrl: './page-test-onpush.component.html',
  styleUrl: './page-test-onpush.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTestOnpushComponent {

}
