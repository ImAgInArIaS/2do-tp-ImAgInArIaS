import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-mapposition',
  templateUrl: './mapposition.component.html',
  styleUrls: ['./mapposition.component.css']
})
export class MappositionComponent {

  @Output() notify = new EventEmitter();
  @Input() public zoom = 2;
  @Input() public lat = 0;
  @Input() public lng = 0;

}
